<template>
  <div class="jobview">
    <div>
      <b-card bg-variant="light">
        <div>
          <b-container fluid class="text-center">
            <b-row>
              <b-col cols="2" md="1"></b-col>
              <b-col cols="14" md="10">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show" inline>
                  <b-row>
                    <b-col>
                      <b-form-group
                                  label="Host&nbsp;&nbsp;"
                                  label-for="host">
                        <b-form-input
                                    type="text"
                                    v-model.trim="form.host"
                                    required
                                    size="sm"
                                    placeholder="Host">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                                  label="Port&nbsp;&nbsp;"
                                  label-for="port">
                        <b-form-input
                                    type="number"
                                    v-model.trim="form.port"
                                    required
                                    size="sm"
                                    placeholder="Port">
                        </b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                                  label="Database Name"
                                  label-for="database">
                        <b-form-input
                                    type="text"
                                    id="database"
                                    v-model.trim="form.database"
                                    required
                                    size="sm"
                                    placeholder="Database Name">
                        </b-form-input>
                      </b-form-group>
                      <b-span v-if="showNullErr" style="color:red;">Please fill correct value</b-span>
                    </b-col>
                    <b-col>
                      <b-form-group
                                  label="Table Name"
                                  label-for="tablename">
                        <b-form-input
                                    type="text"
                                    v-model.trim="form.tablename"
                                    required
                                    size="sm"
                                    placeholder="Table Name">
                        </b-form-input>
                      </b-form-group>
                      <b-span v-if="showNullErr1" style="color:red;">Please fill correct value</b-span>
                    </b-col>
                    <b-col>
                      <label>&nbsp;</label>
                      <b-button type="submit" variant="primary" size="sm">Connect</b-button>
                      <b-button type="reset" size="sm">Reset</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-col>
              <b-col cols="2" md="1"></b-col>
            </b-row>
          </b-container>
        </div>
      </b-card>
    </div>
    <div v-if="isResponse">
      <div>
        <Row :gutter="20" :style="{marginTop: '10px'}">
            <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}" v-for="(v, k, inx) in status" :key="inx">
                <infor-card
                    :id-name="k"
                    :end-val="v.count"
                    :iconType="v.icon"
                    :color="v.color"
                    :intro-text="k"
                ></infor-card>
            </Col>
        </Row>
      </div>
      <hr>
      <div>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Filter" class="mb-0">
                <b-input-group>
                  <b-form-input v-model="filter" placeholder="Type to Search" size="sm"/>
                  <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''"  size="sm">Clear</b-btn>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
           <!--  <b-col md="6" class="my-1">
              <b-form-group horizontal label="Sort" class="mb-0">
                <b-input-group>
                  <b-form-select v-model="sortBy" :options="sortOptions">
                    <option slot="first" :value="null">- none -</option>
                  </b-form-select>
                  <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                    <option :value="false">Asc</option>
                    <option :value="true">Desc</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Sort direction" class="mb-0">
                <b-input-group>
                  <b-form-select v-model="sortDirection" slot="append">
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                    <option value="last">Last</option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
            </b-col> -->
            <b-col md="6" class="my-1">
              <b-form-group horizontal label="Per page" class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" size="sm"/>
              </b-form-group>
            </b-col>
          </b-row>
          <hr>

          <!-- Main table element -->
          <b-table responsive show-empty
                   stacked="md"
                   :bordered="true"
                   :hover="true"
                   :items="items"
                   :fields="fields"
                   :current-page="currentPage"
                   :filter="filter"
                   :per-page="perPage"
                   :sort-by.sync="sortBy"
                   :sort-desc.sync="sortDesc"
                   :sort-direction="sortDirection"
                   @filtered="onFiltered"
          >
            <template slot="dateCreated" slot-scope="row"><span :title="row.value">{{row.value | momentDate}}</span></template>
            <template slot="dateStarted" slot-scope="row"><span :title="row.value">{{row.value | momentDate}}</span></template>
            <template slot="dateFinished" slot-scope="row"><span :title="row.value">{{row.value | momentDate}}</span></template>
            <template slot="status" slot-scope="row">
              <Tag type="dot" :color="calculateColor(row.value)">{{row.value}}</Tag>
            </template>
            <template slot="actions" slot-scope="row">
              <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
              <!-- <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                Info modal
              </b-button> -->
              <b-button size="sm" @click.stop="row.toggleDetails">
                {{ row.detailsShowing ? 'Hide' : 'Show' }}
              </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
              <!-- <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
                </ul>
              </b-card> -->
              <b-card>
                <div>
                  <b-btn v-b-toggle.collapse1 variant="outline-secondary sm">Data</b-btn>
                  <b-collapse id="collapse1" class="mt-2">
                    <b-card>
                      <pre>{{row.item.data}}</pre>
                    </b-card>
                  </b-collapse>
                </div>
                <div>
                  <b-table responsive show-empty
                   stacked="md"
                   :bordered="true"
                   :hover="true"
                   :items="row.item.log"
                   :fields="columns1"></b-table>
                </div>
              </b-card>

              <!-- <b-table striped hover :items="items.data"></b-table> -->
                  <!-- <b-form-group horizontal label="Data" class="" style=" "></b-form-group> -->
          </template>
          </b-table>

          <b-row>
            <b-col md="8"></b-col>
            <b-col md="4" class="my-1" style="float:right">
               <span>
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"  v-if="totalRows > perPage" class="my-0" />
                <span class="totalSpan">Total: {{totalRows}}</span>
              </span>
            </b-col>
          </b-row>
          <!-- <b-row ></b-row> -->

          <!-- Info modal -->
          <!-- <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
          </b-modal> -->

        </b-container>
      </div>
    </div>
  </div>
</template>
<script >
import inforCard from './inforCard'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export default {
  components: {
    inforCard
  },
  data () {
    return {
      form: {
        host: 'devrethink.flowzcluster.tk',
        port: 28015,
        database: '',
        tablename: ''
      },
      show: true,
      status: {
        created: {
          count: 0,
          icon: 'ios-plus',
          color: '#E7A6C9'
        },
        waiting: {
          count: 0,
          icon: 'ios-clock',
          color: '#ffc107'
        },
        active: {
          count: 0,
          icon: 'ios-more',
          color: '#2d8cf0'
        },
        completed: {
          count: 0,
          icon: 'ios-checkmark',
          color: '#64d572'
        },
        // cancelled: 0,
        failed: {
          count: 0,
          icon: 'ios-close',
          color: '#f25e43'
        },
        terminated: {
          count: 0,
          icon: 'ios-minus',
          color: '#ffd572'
        }
      },
      items: [],
      fields: [
        {
          key: 'id',
          label: 'Id',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'priority',
          label: 'Priority',
          sortable: true,
          'class': 'text-center'
        },
        {
          key: 'dateCreated',
          label: 'Date Created',
          sortable: true
        },
        {
          key: 'dateStarted',
          label: 'Date Started',
          sortable: true
        },
        {
          key: 'dateFinished',
          label: 'Date Finished',
          sortable: true
        },
        {
          key: 'processCount',
          label: 'Process Count',
          sortable: true
        },
        {
          key: 'retryCount',
          label: 'Retry Count',
          sortable: true
        },
        {
          key: 'retryMax',
          label: 'Retry Max',
          sortable: true
        },
        {
          key: 'progress',
          label: 'Process',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions'
        }
      ],
      columns1: [
        {
          title: 'date',
          key: 'date',
          sortable: true
        },
        {
          title: 'message',
          key: 'message'
        },
        {
          title: 'processCount',
          key: 'processCount',
          sortable: true
        },
        {
          title: 'queueId',
          key: 'queueId'
        },
        {
          title: 'retryCount',
          key: 'retryCount',
          sortable: true
        },
        {
          title: 'status',
          key: 'status'
        },
        {
          title: 'type',
          key: 'type'
        }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: this.calculateLength,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '' },
      isResponse: false,
      showNullErr: false,
      showNullErr1: false
    }
  },
  filters: {
    momentDate (date) {
      if (!date) return ''
      return moment(date).format('lll')
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },
    calculateLength () {
      return this.items.length
    },
    inputClass: function () {
      // var inputField=document.getElementById('database').value
      if (this.form.database === ' ') {
        return 'invalid'
      } else {
        return 'valid'
      }
    }
  },
  methods: {
    calculateColor (value) {
      return this.status[value].color
    },
    onSubmit (evt) {
      this.showNullErr = false
      this.showNullErr1 = false
      // console.log('this.form.tablename',this.form.tablename.trim(), typeof this.form.tablename)
      var tNme = this.form.tablename
      var dNme = this.form.database
      evt.preventDefault()
      this.isResponse = false
      if (tNme !== '') {
        if (dNme !== '') {
          let url = 'http://localhost:3030'
          this.items = []
          axios.post(url + '/job-list', this.form)
            .then(res => {
              console.log('Success', res.data)
              this.$Notice.success({title: 'Successfully Connected'})
              for (let key in this.status) {
                this.status[key].count = _.filter(res.data, {status: key}).length
              }
              this.items = _.remove(res.data, (m) => {
                if (m.priority) {
                  return m
                }
              })
              this.isResponse = true
              // this.res = res.data
              // this.getValue()
            })
            .catch(err => {
              console.log('Error', err)
            })
        // alert(JSON.stringify(this.form))
        } else {
          this.showNullErr = true
        }
      } else if (tNme === '' && dNme === '') {
        this.showNullErr = true
        this.showNullErr1 = true
      } else {
        this.showNullErr1 = true
      }
    },
    onReset (evt) {
      evt.preventDefault()
      this.form.host = ''
      this.form.port = ''
      this.form.database = ''
      this.form.table = ''
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    info (item, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
  .my-0.pagination.b-pagination.pagination-md{
    float: right;
  }

  .totalSpan{
    float: right;
    margin: 10px 15px;
  }
</style>
