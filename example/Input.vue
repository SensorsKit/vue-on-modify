<template>
  <div class="container">
    <input autofocus v-model="value" type="text" v-on-modify="{ method:onModify, name: 'Aya', age: '16' }">
    <p v-if="isParams">指令带的参数是{{ args }}</p>
    <p v-else>指令没有带参数</p>
    <p>你刚刚修改了 {{count}} 次。</p>
    <p v-if="count > 0">最近一次修改的修改前值为 {{valueBefore?valueBefore:'空'}}, 修改后值为 {{valueAfter?valueAfter:'空'}}</p>
    <p v-else>最近一次修改还没发生。 </p>
    <span class="icon-delete" @click="$emit('remove')"></span>
  </div>
</template>
<script>
  export default {
  data() {
    return {
      value: '',
      count: 0,
      valueBefore: null,
      valueAfter: null,
      isParams: false,
      args: null
    }
  },

  methods: {
    onModify(params) {
      this.count++
      this.valueBefore = params.strOld
      this.valueAfter = params.strNew
      if (params.args) {
        this.isParams = true
        this.args = params.args
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 84px);
  margin: 0 auto;
}

input {
  appearance: none;
  width: calc(100% - 84px);
  height: 42px;
  display: block;
  margin-left: -10px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  padding: 10px 40px 10px 10px;
  color: #333;
  font-size: 16px;
  transition: all 0.25s;
}

input:active,
input:focus {
  outline: none;
  border-color: #4fc08d;
}

.icon-delete {
  position: absolute;
  right: 0;
  top: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("./assets/delete.svg") center/contain no-repeat;
  transition: all 0.25s;
}

.icon-delete:hover {
  background: url("./assets/delete-green.svg") center/contain no-repeat;
  cursor: pointer;
}
</style>

