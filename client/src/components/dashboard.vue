<template>
  <div class="hello layout">
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo">
                  <img src="../assets/images/logo.svg" style="width:100%;vertical-align: inherit;">
                </div>
                <div class="layout-nav">
                </div>
            </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
            <Breadcrumb :style="{margin: '20px 0'}">
                <BreadcrumbItem>Job</BreadcrumbItem>
                <BreadcrumbItem>View</BreadcrumbItem>
            </Breadcrumb>
            <Card>
                <div style="min-height:calc(100vh - 228px);">
                    <jobview></jobview>
                </div>
            </Card>
        </Content>
        <Footer class="layout-footer-center">&copy; 2018 Cenacle, All rights reserved 2017-2018.</Footer>
    </Layout>
  </div>
</template>

<script>
import jobview from './jobview'
export default {
  name: 'dashboard',
  components: {
    jobview
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    /*border: 1px solid #d7dde4;*/
    background: #f5f7f9;
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
