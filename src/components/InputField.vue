<template>
  <div class="todo-main">
    <div class="input-group">
      <InputText v-model="value" @keydown.enter="handleSubmit" placeholder="type your todo"/>
      <Button @click="handleSubmit" icon="pi pi-plus" class="p-button-secondary"></Button>
    </div>
    <div class="todo-container">
      <div
        class="todos"
        v-for="todo in todoList"
        :key="todo.id"
        :class="[todo.completed ? 'green' : 'red']"
      >
        <p>{{ todo.text }}</p>
        <div class="button-sec">
          <Button @click="completeHandler(todo)" icon="pi pi-check" class="p-button-success p-button-rounded">
          </Button>
          <Button @click="setNotifier(todo)" icon="pi pi-clock" class="p-button-rounded"></Button>
          <Button @click="removeHandler(todo)" icon="pi pi-trash" class="p-button-danger p-button-rounded">
          </Button>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="notifyVisible" :modal="true">
    {{notifyMessage}}
  </Dialog>
  <Dialog v-model:visible="visible" :modal="true" :closable="false">
    <div class="modal-container">
      <div class="notifier-inputs">
        <InputNumber v-model="minutes" mode="decimal" showButtons buttonLayout="vertical" decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
        <InputNumber v-model="hours" mode="decimal" showButtons buttonLayout="vertical" decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
        <InputNumber v-model="days" mode="decimal" showButtons buttonLayout="vertical" decrementButtonClass="p-button-secondary" incrementButtonClass="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/>
      </div>
      <Button @click="handleTimer">ok</Button>
    </div>
  </Dialog>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog"
import InputNumber from "primevue/inputnumber"
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      todoList: [],
      visible:false,
      minutes:0,
      hours:0,
      days:0,
      timeset:0,
      modalOpen:false,
      notifyMessage:"",
      notifyVisible:false
    };
  },
  methods: {
    handleSubmit() {
      if(this.value.length > 50){
        for(let i=50 ;i < this.value.length;i+=50){
          this.value=this.value.slice(0,i)+"\n"+this.value.slice(i,this.value.length-1)
        }
      }
      if (this.value != "") {
        this.todoList.push({
          text: this.value,
          id: new Date().getTime(),
          completed: false,
        });
        axios.post("http://localhost:3000/todos", {
          text: this.value,
          id: new Date().getTime(),
          completed: false,
        });
        this.value = "";
      }
    },
    handleTimer(){
      let waittime=this.minutes*60000 + this.hours * 3600000 + this.days * 86400000
      this.minutes=0
      this.hours=0
      this.days=0
      setTimeout(()=>{ 
        this.notifyVisible=true
      },waittime)
      this.modalOpen=false
      this.visible=false
      
    },
    setNotifier(todo){
      this.visible=true
      this.modalOpen=true
      this.notifyMessage=todo.text+" is timed out"
    },
    removeHandler(todo) {
      if (todo.completed) {
        this.todoList.splice(this.todoList.indexOf(todo), 1);
        axios.delete(`http://localhost:3000/todos/${todo.id}`);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "todo removed",
          life: 3000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: "todo must be completed",
          life: 3000,
        });
      }
    },
    completeHandler(todo) {
      todo.completed = true;
      axios.put(`http://localhost:3000/todos/${todo.id}`, todo);
    },
  },
  mounted() {
    axios.get("http://localhost:3000/todos").then((res) => {
      console.log(res);
      this.todoList = res.data;
    });
  },
  components: {
    Button,
    InputText,
    Dialog,
    InputNumber
  },
};
</script>

<style>
.red {
  background-color: rgb(245, 127, 84);
  color: white;
}
.green {
  background-color: rgb(149, 224, 35);
  color: rgb(78, 75, 75);
  font-style: italic;
}
.green > p {
  text-decoration-line: line-through;
}
.input-group {
  display: flex;
  justify-content: center;
}
.input-group > .p-inputtext {
  margin-right: 5px;
}
.button-sec {
  display: flex;
  justify-content: flex-end;
}
.todos {
  padding: 10px;
  border-radius: 20px;
  min-width: 500px;
  max-width: fit-content;
}
.button-sec > Button {
  background-color: rgb(121, 6, 121) !important;
}
.button-sec > .p-button-danger {
  border: 1px solid red;
}
.button-sec > .p-button-danger {
  border: 1px solid green;
}
.todo-container {
margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.todo-container>*{
    margin-top: 10px;
}
.modal-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>