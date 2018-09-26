var urldb = `mongodb://:@ds245532.mlab.com:45532/`

class user_infomation { // Xuất danh sách người dùng
    constructor() {
        var mongodb = require("mongodb");
        this.mongo_client = mongodb.MongoClient;
        this.customer = {};
        this.url = urldb;
        this.valid_user = false;
    }
    //Connect and close DataBase
    client() {
        return this.mongo_client;

    }
    // cài đặt url để kết nối với database
    set_urldb(url) {
        if (url != "") { this.url = url };
    }
    //trả về giá trị của url
    get_url() {
        if (this.url != "") { return this.url }
        else { return "" }
    }
    // Mở cổng kết nối với database
    open() {
        var result = ""
        if (this.get_url() != "") {
            this.client().connect(this.get_url())
        }
        else {
            alert("Không thể kết nối được")
            result = false
        }
        return true
    }
    // Đóng cổng kết nối với database
    close() {
        if (this.open() == true) {
            this.client().close();
        }
    }
    // Kiểm tra điều kiện tài khoản hoặc mật khẩu
    is_valid_account(id, password) {
        this.open()
        var name_db = "user_ux";
        var db = client.db(name_db);
        var user_info = db.collection("login");
        //Cài đặt điều kiện ID nhập vào
        dieu_kien_id = {
            "id": id
        }
        dieu_kien_email = {
            "email": id
        }
        dieu_kien_gop = {
            $or: [dieu_kien_id, dieu_kien_email]
        }
        //Cài đặt điều kiện mật khẩu nhập vào
        dieu_kien_pw = {
            "password": password
        }
        //Cài đặt điều kiện thỏa mãn
        dieu_kien_dang_nhap = {
            $and: [dieu_kien_gop, dieu_kien_pw]
        }
        // Tạo kết quả trả về
        var result = "";

        //Tìm kiếm 1 tài khoản trên kho dữ liệu
        user_info.findOne(dieu_kien_dang_nhap, (err, danh_sach) => {
            if (err) {
                result = "Mật khẩu hoặc tài khoản không chính xác.\nXin vui lòng đăng nhập lại!";
                this.valid_user = false;
            } else {
                this.valid_user = true;
                this.customer = danh_sach;
                result = danh_sach;
            }
        })
        this.close()
        return result;
    }
    // Kiểm tra kết quả sau khi người dùng đăng nhập
    valid() {
        return this.valid_user;
    }
    // Nhận danh sách sau khi người dùng đăng nhập
    customer(){
        if(this.valid() == true){
            return this.customer;
        }
        else{
            return "không có giá trị người dùng";
        }
    }
    // Cập nhật danh sách đơn hàng
    update(result){
        this.open()
        var name_db = "";
        var db = client.db(name_db);
        var user_info = db.collection("");
        user_info.update(result,(err,kq)=>{
            if(err){
                return err;
            }else{
                return "Cập nhật tài khoản thành công";
            }
        });
        this.close()
    }
    //Tạo tài khoản người dùng
    insert(new_account){
        this.open();
        var name_db = "";
        var db = client.db(name_db);
        var user_info = db.collection("");
        user_info.insert(new_account,(err,success)=>{
            if(success){
                return "Tạo tài khoản thành công.";
            }else{
                return "Tài khoản hoặc email đã được đăng ký.";
            }
        })
    }
    // Cập nhật đơn hàng và cập nhật sản phẩm đã xem
    update_product(update_product){
        this.open()
        var name_db = "";
        var db = client.db(name_db);
        var user_info = db.collection("");
        user_info.update(update_product,(err,success)=>{
            if(err){
                return err;
            }else{
                return success;
            }
        });
    }
}

module.exports = new user_infomation()
