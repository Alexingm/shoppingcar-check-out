var app=new Vue({
    el: "#app",
    data:{
        productList:[],
        totalMoney:59,
        checkAllFlag:false,
        totalPrice:0,
        delFlag:false,
        carProduct:''
           },
    filters:{
        formatMoney:function (value,type) {
            return "￥"+value.toFixed(2)+type;
        }
    },
    mounted:function () {
        this.$nextTick(function() {
            this.cartView();//利用钩子函数调用json的数据
        });
    },
    methods:{
        cartView: function() {
            this.$http.get('data/cart.json').then(data => {      //获取json数据
                this.productList = data.body.result.productList;
                this.totalMoney = data.body.result.totalMoney;
            })
        },
        changeNum: function (item,value) {
            if(value>0){
                item.productQuentity++;
            }
            else {
                item.productQuentity--;
                if(item.productQuentity<1) {
                    item.productQuentity=1;
                }
            }
        },
        selectedProduct:function(item){
            if(typeof item.checked == 'undefined'){
                // vue.set(item,'checked',true);
                this.$set(item,'checked',true);
            }else{
                item.checked==!item.checked;
            }
            this.calcTotalPrice();
            },
        changeCheckAllState:function (flag) {
            this.checkAllFlag= flag;
            var _this=this;
            if(this.checkAllFlag){
                this.productList.forEach(function (item,index) {
                    if(typeof item.checked == 'undefined'){
                        _this.$set(item,'checked',_this.checkAllFlag);
                    }else {
                        item.checked=_this.checkAllFlag;
                    }
                });
            }
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this=this;
            this.totalMoney=0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
               _this.totalMoney+=item.productPrice*item.productQuentity;
                }
            });
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.carProduct=item;
        },
        delProduct:function () {
            var index=this.this.productList.indexOf(this.carProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }

    }
});


/*
Vue.filter('money',function (value,type) {
    return "￥"+value.toFixed(2)+type;
})
*/
