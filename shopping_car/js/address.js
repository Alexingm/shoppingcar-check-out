/**
 * Created by Alexin on 2017/5/13.
 */
new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function () {
        this.$nextTick(function () {
           this. getAddressList();
        })
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
            this.$http.get('data/address.json').then(function (res) {
                var _this=this;
                if(res.data.status == '1'){
                    _this.addressList =res.body.result;

                }
            })
        },
        loaderMore:function () {
            if(this.limitNum==this.addressList.length){
                this.limitNum=3;
            }else {
                this.limitNum=this.addressList.length;
            }

        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }
                else {
                    address.isDefault=false;
                }
            })
        },
        addAddress:function () {
            this.$http.get('data/address.json').then(function (res) {
                var module=res.body.module;
                this.limitNum=this.addressList.length+1;
                this.addressList.splice(this.limitNum,0,module);
            })

        },
        delAddress:function () {
            this.limitNum=this.addressList.length+1;
            this.addressList.splice(this.currentIndex,1);
        }
        
    }
    
});