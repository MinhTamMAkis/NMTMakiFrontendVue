// Dữ liệu giả định
const data = [
    { id: 1, name: 'Item 1', description: 'This is the first item' },
    { id: 2, name: 'Item 2', description: 'This is the second item' },
    { id: 3, name: 'Item 3', description: 'This is the third item' },
];

// Khởi tạo Vue instance
new Vue({
    el: '#app',
    data: {
        title: 'My Vue.js App',
        items: data,
    },
});
