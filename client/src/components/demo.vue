<style scoped>
.main {
  margin-left: 70px;
  column-span: 
}
.inner {
  margin-left: 170px
}
</style>
<template>
<div>
    <Form ref='formInline' :model='formInline' :rules='ruleInline' inline><br><br>
        <Row class='col-sm-10;' style="margin-left: 70px;" >
           <div class="col-sm-10" style="background-color: red">
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
        <Table :columns='columns1' :data='res'></Table>
    </Form>
    </div>
</template>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script>
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
          key: 'id'
        },
        {
          title: 'Priority',
          key: 'priority'
        },
        {
          title: 'Date Created',
          key: 'dateCreated' 
        },
        {
          title: 'Status',
          key: 'status'
        }
      ],
      res: []
    }
  },
  methods: {
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
