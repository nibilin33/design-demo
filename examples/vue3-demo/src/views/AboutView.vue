<template>
  <div class="about">
    <h1>This is an about page</h1>
    <himo-tabs :tabList="tabList" @tabClick="handleTabClick">
      <!-- eslint-disable  -->
      <div slot="test1">panel1</div>
      <div slot="test2">panel2</div>
    </himo-tabs>
  </div>
</template>

<script>
  import { HimoTabs } from '../../../../pacakges/webcomponent-ui/lib';
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { HimoTabs },
    data() {
      return {
        tabList: [
        {
          tab: 'test',
          itemKey: 'test1'
        },
        {
          tab: 'test2',
          itemKey: 'test2'
        }
      ]
      }
    },
    methods: {
      handleTabClick(event) {
        console.log('handleTabClick',event);
      }
    }
  });
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
