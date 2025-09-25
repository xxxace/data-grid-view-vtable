<template>
    <div style="height: 600px; width: 1000px;">
        <EditableTable :columns="columns" :data="data" />
    </div>
</template>
<script setup lang="ts">
import EditableTable from "@/components/DataGridView/index.vue";

const columns = [
    { title: "Name", field: "name", key: "name" },
    { title: "Age", field: "age", key: "age" },
    { title: "Address", field: "address", key: "address" },
    { title: "Action", field: "action", key: "action" },
];

const data = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        action: "Edit",
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        action: "Edit",
    },
    {
    }
]
</script>