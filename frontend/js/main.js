const datas = [
    { id: 1, name: 'Item 1', description: 'This is the first item', status: "" },
    { id: 2, name: 'Item 2', description: 'This is the second item', status: "" },
    { id: 3, name: 'Item 3', description: 'This is the third item', status: "343" },
];

// Khởi tạo Vue 3 instance
const app = Vue.createApp({
    data() {
        return {
            title: 'My Vue.js App',
            items: datas,
        };
    },
    mounted() {
        console.log("Vue instance mounted");
        console.log(this.title);  // Kiểm tra giá trị title
        console.log(this.items);  // Kiểm tra dữ liệu items
    }
});

// Mount Vue instance vào element #app
app.mount('#app');
