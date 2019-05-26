<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  import { Timeline } from 'element-ui';

  export default {
    data: () => ({
    }),
    computed: {
      activities () {
        return this.$store.state.api.verificationApi;
      }
    },
    components:{
      Timeline
    }
  };
</script>

<style>
  .block {
    margin-top: 100px;
  }
  .el-timeline-item__icon{
    margin-left: 1px;
  }
</style>
