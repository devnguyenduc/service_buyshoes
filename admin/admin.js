
var admin_id = "";
var admin_password = "" //
var admin_product = ""
var url = `mongodb://${admin_id}:${admin_password}@ds245532.mlab.com:45532/${admin_product}`
class admin {
    constructor() {
        var mongodb = require("mongodb");
        this.mongo_client = mongodb.MongoClient;
        this.admin_id = ""
        this.admid_password = ""
        this.admin_product = ""
        this.url = ""
        this.is_admin = false
    }

    // Kiểm tra quyền admin
    isAdmin(id, password) {
        var result = ""
        this.url = `mongodb://${id}:${password}@ds245532.mlab.com:45532/${admin_product}`;
        this.mongo_client.connect(this.url, (err, client) => {
            if (err) {
                result = "Chúc mừng bạn kết nối thành công";
                client.close()
            }
            else {
                result = "Kết nối thành công tài khoản admin";
                this.is_admin = true;
                this.admin_id = id;
                this.admid_password = password;
                client.close();
            }
        })
        return result;
    }

    // cài đặt đường dẫn tới cơ sở dữ liệu
    set_url() {
        this.url = `mongodb://${this.admin_id}:${this.admin_password}@ds245532.mlab.com:45532/${admin_product}`;
    }
    get_url(){
        if(this.is_admin){
            return this.url
        }else{
            return "Không có quyền truy cập"
        }
        
    }

    doc_toan_bo_danh_sach_giay() {// req là yêu cầu đọc dữ liệu lên từ các tính năng của admin như: banner||product
        var result = ""
        if (this.is_admin) {
            this.mongo_client.connect(this.get_url(), (err, client) => {
                if (err) {
                    result = err;
                } else {
                    var name_db = admin_product;
                    var db = client.db(name_db);
                    var shoes = db.collection(product);
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
        } else {
            result = "Bạn không có quyền truy cập chức năng này";
        }

        return result;
    }

    // Lọc danh sách sản phẩm theo điều kiện gửi về
    loc_theo_dieu_kien(danh_sach_dieu_kien) {
        var result = ""
        if (this.is_admin) {
            this.mongo_client.connect(this.get_url(), (err, client) => {
                if (err) {
                    result = err;
                } else {
                    var name_db = admin_product;
                    var db = client.db(name_db);
                    var shoes = db.collection(product);
                    var dieu_kien = {
                        $and: danh_sach_dieu_kien
                    };
                    shoes.find(dieu_kien).toArray((err, danh_sach_giay) => {
                        if (err) {
                            rerult = err
                        } else {
                            if (danh_sach_giay.length == 0) {
                                result = "Không có sản phẩm theo yêu cầu"
                            }
                            else {
                                result = danh_sach_giay
                            }
                            setTimeout(() => {
                                client.close()
                            }, 2000)
                        }
                    })
                }
            })
        } else {
            result = "Bạn không có quyền truy cập chức năng này";
        }
        return result;

    }

    //Thêm sản phẩm
    them_mot_san_pham(san_pham) {
        var result = ""
        if (this.is_admin) {
            this.mongo_client.connect(this.get_url());
            var name_db = admin_product;
            var db = client.db(name_db);
            var shoes = db.collection(product);
            shoes.insert(san_pham, (err, result) => {
                if (err) {
                    result = error;
                } else {
                    result = result;
                }
            })
            this.mongo_client.close()
        } else {
            result = "Bạn không có quyền truy cập chức năng này";
        }
        return result
    }
    //Xóa sản phẩm
    xoa_san_pham(dieu_kien) {
        var result = ""
        if (this.is_admin) {
            this.mongo_client.connect(this.get_url());
            var name_db = admin_product;
            var db = client.db(name_db);
            var shoes = db.collection(product);
            shoes.remove(dieu_kien, (err, kq) => {
                if (err) {
                    result = err;
                } else {
                    result = kq;
                }
            })
            this.mongo_client.close();
        } else {
            result = "Bạn không có quyền truy cập chức năng này";
        }
        return result;
    }
    cap_nhat_san_pham(san_pham_cap_nhat){
        var result = ""
        if(this.is_admin){
            this.mongo_client.connect(this.get_url());
            var name_db = admin_product;
            var db = client.db(name_db);
            var shoes = db.collection(product);
            shoes.update(san_pham_cap_nhat,(err,success)=>{
                if(err){
                    result = err
                }else{
                    result = success
                }
            })
        }
        return result
    }
    them_danh_sach(){}
    doc_danh_sach_tai_khoan_nguoi_dung(){

    }
    doc_du_lieu_nguoi_dung(dieu_khien_du_lieu){

    }
    xoa_tai_khoan_nguoi_dung(tai_khoan_nguoi_dung){

    }
}

module.exports = new admin()
