<style scoped>
.expand-row {
  margin-bottom: 20px;
   display: list-item;
  margin-left: 70px;
}
.expand-row1 {
  margin-bottom: 20px;
  background-color: #ccf9ff;
  margin-left: 70px;
}
</style>
<template class="" >
    <div class=""  >
        <form ><br>
            <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">Date Created :- </span>
                 <span class="expand-value">{{ row.dateCreated }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">Date Enable :- </span>
                 <span class="expand-value">{{ row.dateEnable }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">Date Finished :- </span>
                 <span class="expand-value">{{ row.dateFinished }}</span>
            </Col></row><row class="expand-row">
            <Col span="6">
                <span class="expand-key">Date Started :- </span>
                 <span class="expand-value">{{ row.dateStarted }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">Id :- </span>
                 <span class="expand-value">{{ row.id }}</span>
            </Col>
        </Row>
         <h3 style="color: #4d73ff">Log :- </h3><br>
     <Table :columns="columns3" :data="row.log"  style=" margin-left: 70px;" border height="200"></Table>
      <h3 style="color: #4d73ff">Data :- </h3><br>
       <pre style=" margin-left: 70px;">{{row.data}}</pre>
     </form>
</div>
</template>
<script>
/* eslint-disable */
import moment from "moment";
export default {
  props: {
    row: Object
  },
  data() {
    return {
      columns3: [
        {
          title: "Date",
          key: "date",
          sortable: true,
          width: 200,
          render: (h, params) => {
            let myDate = params.row.date;
            return h("div", moment(myDate).format("lll"));
          }
        },
        {
          title: "Message",
          key: "message",
          width: 200
        },
        {
          title: "ProcessCount",
          key: "processCount",
          width: 150,
          filters: [
            {
              label: "1",
              value: 1
            },
            {
              label: "0",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.processCount === 1;
            } else if (value === 2) {
              return row.processCount === 0;
            }
          }
        },
        {
          title: "QueueId",
          key: "queueId",
          width: 300
        },
        {
          title: "RetryCount",
          key: "retryCount",
          width: 120
        },
        {
          title: "Status",
          key: "status",
          width: 120
        },
        {
          title: "Type",
          key: "type",
          width: 120
        }
      ]
    };
  },
  mounted() {},
  methods: {
    momentDate(date) {
      if (!date) return "";
      return date.moment().format("lll");
    }
  }
};
</script>
