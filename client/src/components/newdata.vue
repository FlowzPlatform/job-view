<style scoped>
.expand-row {
  margin-bottom: 20px;
  margin-left: 70px;
  /* background-color: #DBB1CD; */
}
.expand-row1 {
  margin-bottom: 20px;
   background-color:#ccf9ff;
  margin-left: 70px;
  /* background-color:#00A591; */
}
.main{
   
}
.span{
}
</style>
<template>
    <div class="">
        <form>    
            <Row class="expand-row">
            <Col span="6">
                <span class="expand-key">dateCreated:- </span>
                 <span class="expand-value">{{ row.dateCreated }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">dateEnable:- </span>
                 <span class="expand-value">{{ row.dateEnable }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">dateFinished:- </span>
                 <span class="expand-value">{{ row.dateFinished }}</span>
            </Col></row><row class="expand-row">
            <Col span="6">
                <span class="expand-key">dateStarted:- </span>
                 <span class="expand-value">{{ row.dateStarted }}</span>
            </Col>
            <Col span="6">
                <span class="expand-key">id:- </span>
                 <span class="expand-value">{{ row.id }}</span>
            </Col>
        </Row>
         <h3 style="color: #4d73ff">Log :- </h3>
            <Row class="expand-row1">
            <Col span="3">
                <span class="expand-key">Date: </span>   
            </Col>
            <Col span="3">
                <span class="expand-key">Message: </span>
            </Col>
            <Col span="3">
                <span class="expand-key">ProcessCount: </span>
            </Col>
            <Col span="5">
                <span class="expand-key">QueueId: </span>
            </Col>
            <Col span="3">
                <span class="expand-key">RetryCount: </span>
            </Col>
            <Col span="3">
                <span class="expand-key">Status: </span>
            </Col>
              <Col span="3">
                <span class="expand-key">Type: </span>
            </Col>
        </Row>
        <!-- <Row class="expand-row" v-for="log1 in row.log" >
            <Col span="3">
                <span class="expand-value">{{ log1.date }}</span>
            </Col>
            <Col span="3">
                <span class="expand-value">{{ log1.message }}</span>
            </Col>
            <Col span="3">
                <span class="expand-value">{{ log1.processCount }}</span>
            </Col>
            <Col span="5">
               <span class="expand-value">{{ log1.queueId }}</span>
            </Col>
            <Col span="3">
               <span class="expand-value">{{ log1.retryCount }}</span>
            </Col>
            <Col span="3">
               <span class="expand-value">{{ log1.status }}</span>
            </Col>
              <Col span="3">
                <span class="expand-value">{{ log1.type }}</span>
            </Col>
        </Row> -->
        <h3 style="color: #4d73ff">Data :- </h3>
        <pre>{{row.data}}</pre>
     <Table :columns="columns3" :data="row.log" ></Table>
     </form>
</div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data() {
    return{
          columns3: [
        {
          title: 'Date',
          key: 'date'
        },
        {
          title: 'Priority',
          key: 'message'
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
      row : []  
    }
  }
}
</script>
