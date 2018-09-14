var http = require("http")
var admin = require("../admin/admin")
var user = require("../user/user")
var product = require("../user/stored")
var Xu_ly_Tham_so = require('querystring')

var port = 2000

var server = http.createServer((req,res)=>{
    var Chuoi_Nhan = ""
    var Chuoi_Kq = "{}"
    var Dia_chi = req
        .url
        .replace("/", "").replace("?", "")
    var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
    var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
    req.on('data', (chunk) => { Chuoi_Nhan += chunk })
    req.on('end',()=>{
        if(Ma_so_Xu_ly == "admin_login"){
            hello = {
                "id" : "vanhuanak808",
                "pass" : "Khongaibiet808"
            }
            console.log(hello)
            var valid = JSON.parse(hello)
            console.log(valid)
            Chuoi_Kq = admin.isAdmin(valid.id,valid.password)
            console.log(Chuoi_Kq)
        }
        else if(Ma_so_Xu_ly == "admin_product"){
            obj_result = {}
            obj_result.all_product = admin.doc_toan_bo_danh_sach_giay()
            Chuoi_Kq = JSON.stringify(obj_result)
        }else if(Ma_so_Xu_ly == "admin_filter"){
            obj_result = {}
            obj_receive = JSON.parse(Chuoi_Nhan)
            obj_result.filter = admin.loc_theo_dieu_kien(obj_receive)
            Chuoi_Kq = JSON.stringify(obj_result)
        }else if(Ma_so_Xu_ly == "admin_add_product"){
            obj_receive = JSON.parse(Chuoi_Nhan)
            Chuoi_Kq = admin.them_mot_san_pham(obj_receive)
        }else if(Ma_so_Xu_ly == "admin_delete_product"){
            obj_receive = JSON.parse(Chuoi_Nhan)
            Chuoi_Kq = admin.xoa_san_pham(obj_receive)
        }else if(Ma_so_Xu_ly == "read_all_product"){
            obj_result = {}
            obj_result.all_product = product.doc_toan_bo_danh_sach_giay()
            Chuoi_Kq = JSON.stringify(obj_result)
        }else if(Ma_so_Xu_ly == "read_best_buy"){
            obj_result = {}
            obj_result.all_product = product.doc_danh_sach_mua_nhieu()
            Chuoi_Kq = JSON.stringify(obj_result)
        }else if(Ma_so_Xu_ly == "tao_tai_khoan"){
            obj_receive = JSON.parse(Chuoi_Nhan)
            Chuoi_Kq= user.insert(obj_receive)
        }else if(Ma_so_Xu_ly == "dang_nhap"){
            obj_receive = JSON.parse(Chuoi_Nhan)
            user.is_valid_account()
        }
        else{
            Chuoi_Kq = "Không có gì hết"
        }
        res.setHeader("Access-Control-Allow-Origin", '*')
        res.end(Chuoi_Kq)
    })
})

server.listen(port,console.log("Server đang chạy tại cổng "+ port))