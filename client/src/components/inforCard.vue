<style>
    .infor-card-icon-con{
        height: 100%;
    }
    .height-100{
        height: 100%;
    }
    .infor-card-con{
        height: 100px;
    }
    .infor-intro-text{
        font-size:20px;
        font-weight:500;
        color:#b5acac;
    }
</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con">
            <Col class="infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </Col>
            <Col span="16" class="height-100">
                <Row type="flex" align="middle" justify="center" class="height-100">
                    <count-up
                        class="infor-card-count user-created-count"
                        :id-name="idName"
                        :end-val="endVal"
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                    >
                        <p class="infor-intro-text" slot="intro" :style="{color: color}">{{ introText | capitalize}}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue'
export default {
  name: 'inforCard',
  components: {
    countUp
  },
  props: {
    idName: String,
    endVal: Number,
    color: String,
    iconType: String,
    introText: String,
    countSize: {
      type: String,
      default: '40px'
    },
    countWeight: {
      type: Number,
      default: 700
    },
    iconSize: {
      type: Number,
      default: 40
    }
  },
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value[0].toUpperCase() + value.slice(1)
    }
  }
}
</script>
