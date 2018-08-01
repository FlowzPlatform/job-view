<style scoped>
.high {
  margin-left: 50px;
}
.main {
  margin-left: 70px;
}
.inner {
  margin-left: 70px
}
</style>
<template >
<div class="high">
    <Form ref='formInline' :model='formInline' :rules='ruleInline' inline><br><br>
        <Row class='col-sm-10;' style="margin-left: 200px;" >
           <div class="col-sm-10">
        <Col span='5'><FormItem prop='host'>
           <label >HOST</label>
            <Input type='text' v-model.trim='formInline.host' placeholder='host'>
            </Input>
        </FormItem></Col>
        <Col span='5'><FormItem prop='port'>
            <label >PORT</label>
            <Input type='text' v-model.trim='formInline.port' placeholder='port' number>
            </Input>
        </FormItem></Col>
        <Col span='5'><FormItem prop='database'>
            <label >DATABASE</label>
            <Input type='text' v-model.trim='formInline.database' placeholder='database'>
            </Input>
        </FormItem></Col>
        <Col span='5'><FormItem prop='tablename'>
           <label >TABLE</label>
            <Input type='text' v-model.trim='formInline.tablename' placeholder='tablename'>
            </Input>
        </FormItem></Col>
        </div>
        <Col span='4'>
        <FormItem>
            <Button type='primary' @click="handleSubmit('formInline')">Connect</Button>
        </FormItem>
        </col>
        </Row><br><br>
        <Row>
          <Col :span="3" v-for="(value, key) in status" :key="key">
            {{key}}&nbsp;&nbsp;&nbsp;{{value}}
          </Col>
        </Row>
        <Table :columns='columns1' :data='pageData[page - 1]' border style=" margin-left: 0px; margin-right: 50px"></Table>
        <Page :total="res.length" :current="page" :page-size="pagesize" size="small" align="center" show-sizer @on-change="pageChange" @on-page-size-change="pagesize1" />
    </Form>
    </div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
/* eslint-disable */
import BootstrapVue from 'bootstrap-vue'
import _ from 'lodash'
import expandRow from './newdata.vue'
import axios from 'axios'
export default {
  data () {
    const validatePort = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please fill in the Port name'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'))
        } else {
          callback()
        }
      })
    }
    return {
      page: 1,
      pagesize: 10,

      formInline: {
        host: 'devrethink.flowzcluster.tk',
        port: 28015,
        database: 'FlowzDBETL',
        tablename: 'product_sync_worker'
      },
      status: {
        created: 0,
        waiting: 0,
        active: 0,
        completed: 0,
        cancelled: 0,
        failed: 0,
        terminated: 0
      },
      ruleInline: {
        host: [
          {
            required: true,
            message: 'Please fill in the host name',
            trigger: 'blur'
          }
        ],
        port: [{ validator: validatePort, required: true, trigger: 'blur' }],
        database: [
          {
            required: true,
            message: 'Please fill in the database.',
            trigger: 'blur'
          }
        ],
        tablename: [
          {
            required: true,
            message: 'Please fill in the table.',
            trigger: 'blur'
          }
        ]
      },
      pageData: [],
      columns1: [
        {
          type: 'expand',
          width: 100,
          render: (h, par) => {
            return h(expandRow, {
              props: {
                row: par.row
              }
            })
          }
        },
        {
          title: 'Id',
          key: 'id',
          width: 320
        },
        {
          title: 'Priority',
          key: 'priority',
          width: 190
        },
        {
          title: 'Date Created',
          key: 'dateCreated',
          sortable: true,
          width: 240
        },
        {
          title: 'Status',
          key: 'status',
          width: 190,
          filters: [
              {
                  label: 'created',
                  value: 1
              },
              {
                  label: 'waiting',
                  value: 2
              },
              {
                  label: 'active',
                  value: 3
              },
              {
                  label: 'completed',
                  value: 4
              },
              {
                  label: 'cancelled',
                  value: 5
              },
              {
                  label: 'failed',
                  value: 6
              },
              {
                  label: 'terminated',
                  value: 7
              }
          ],
          filterMultiple: false,
          filterMethod (value, res){
              if (value === 1) {
                  return res.status === 'created';
              } else if (value === 2) {
                  return res.status === 'waiting';
              }else if (value === 3) {
                  return res.status === 'active';
              }else if (value === 4) {
                  return res.status === 'completed';
              }else if (value === 5) {
                  return res.status === 'cancelled';
              }else if (value === 6) {
                  return res.status === 'failed';
              }else if (value === 7) {
                  return res.status === 'terminated';
              }
          }
        }
      ],
      res: []
    }
  },
  methods: {
    pagesize1 (pagesize) {
         this.pagesize = this.pagesize
         this.getValue()
    },
    pageChange (page) {
      this.page = page
    },
    getValue () {
      this.pageData = _.chunk(this.res, this.pagesize)
    },
    handleSubmit (name) {
      this.res = []
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!')
          let url = 'http://localhost:3030'
          axios
            .post(url + '/job-list', this.formInline)
            .then(res => {
              console.log('Success', res)
              for (let key in this.status) {
                this.status[key] = _.filter(res.data, {status: key}).length;
              }
              this.res = res.data
              this.getValue()
              // console.log('pdata', this.pageData, this.pageData.length)
            })
            .catch(err => {
              console.log('Error', err)
            })
        } else {
          this.$Message.error('Fail to connect.....!')
        }
      })
    }
  }
}
</script>
