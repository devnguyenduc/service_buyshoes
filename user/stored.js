var tech = ".json"
var file = require("fs")
var urldb = `mongodb://:@ds245532.mlab.com:45532/`
// class User{
//     constructor(){
//         this.id = ""
//         this.name = ""
//         this.password = ""
//         this.address = ""
//         this.product = []
//         this.click = 0
//     }

//     // Tạo tài khoản với id người dùng
//     setId(id){
//         this.id = id
//     }
//     getId(){
//         return this.id
//     }
//     // Cập nhật tên người dùng
//     setName(name){
//         this.name = name
//     }
//     getName(){
//         return this.name
//     }
//     // Cài đặt mật khẩu cho tài khoản người dùng
//     setPassword(password){
//         this.password = password
//     }
//     getPassword(){
//         return this.password
//     }
//     // Cài đặt địa chỉ người dùng
//     setAddress(address){
//         this.address = address
//     }
//     getAddress(){
//         return this.address
//     }
//     // Sản phẩm mà người dùng đã chọn
//     setProduct(product){
//         this.product.push(product)
//     }
//     getProduct(){
//         return this.product
//     }
//     clearProduct(){
//         this.product = []
//     }
//     // Số lần click vào sản phẩm
//     // onClick(){
//     //     this.click++
//     // }
// }

var urldb = `mongodb://:@ds245532.mlab.com:45532/`;
class stored {
    constructor() {
        this.url = urldb;
        var mongodb = require("mongodb");
        var mongo_client = mongodb.MongoClient;
        this.client = mongo_client;
    }

    //Đọc toàn bộ danh sách sản phẩm cửa hàng
    doc_toan_bo_danh_sach_giay() {
        var result = "";
        this.client.connect(this.url, (err, client) => {
            if (err) {
                result = err;
            } else {
                var name_db = "";
                var db = client.db(name_db);
                var shoes = db.collection("");
                shoes.find({}).toArray((err, danh_sach_giay) => {
                    if (err) {
                        result = err;
                    } else {
                        result = danh_sach_giay;
                        client.close();
                    }
                })
            }
        })
        return result;
    }
    // Đọc danh sách các sản phẩm mua nhiều tại cửa hàng
    doc_danh_sach_mua_nhieu() {
        var result = "";
        this.client.connect(this.url, (err, client) => {
            if (err) {
                result = err;
            } else {
                var name_db = "";
                var db = client.db(name_db);
                var shoes = db.collection("");
                var luot_mua = {
                    "buy": -1
                }
                shoes.find({}).sort(luot_mua).skip(0).limit(10).toArray((err, danh_sach_giay) => {
                    if (err) {
                        result = err;
                    } else {
                        result = danh_sach_giay;
                        client.close();
                    }
                })
            }
        })
        return result;
    }
    //Đọc dnah sách sản phẩm theo điều kiện truyền vào
    doc_danh_sach(dieu_kien){
        var result = {};
        this.client.connect(this.url,(err,client)=>{
            if(err){
                console.log(err);
            }else{
                var name_db = "";
                var db = client.db(name_db);
                var shoes = db.collection("");
                shoes.find(dieu_kien).toArray((err,danh_sach_giay)=>{
                    if(err){
                        console.log(err);
                    }else{
                        result = danh_sach_giay;
                    }
                })
            }
        })
        return result
    }
}
module.exports = new stored()
