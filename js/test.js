window.onresize = function() {
    img_location("container", "box");
}
window.onload = function() {
    img_location("container", "box");
    var img_data = { //利用json字串来模擬測試
        "data": [{
            "name": "001.jpg"
        }, {
            "name": "002.jpg"
        }, {
            "name": "003.jpg"
        }, {
            "name": "004.jpg"
        }, {
            "name": "005.jpg"
        }, {
            "name": "006.jpg"
        }, {
            "name": "007.jpg"
        }, {
            "name": "008.jpg"
        }, {
            "name": "009.jpg"
        }, {
            "name": "010.jpg"
        }, {
            "name": "011.jpg"
        }, {
            "name": "012.jpg"
        }, {
            "name": "013.jpg"
        }, {
            "name": "014.jpg"
        }, {
            "name": "015.jpg"
        }, {
            "name": "016.jpg"
        }, {
            "name": "017.jpg"
        }, {
            "name": "018.jpg"
        }, {
            "name": "019.jpg"
        }, {
            "name": "020.jpg"
        }, {
            "name": "021.jpg"
        }, {
            "name": "022.jpg"
        }, {
            "name": "023.jpg"
        }, {
            "name": "024.jpg"
        }, {
            "name": "025.jpg"
        }, {
            "name": "026.jpg"
        }, {
            "name": "027.jpg"
        }, {
            "name": "028.jpg"
        }]
    }
    window.onscroll = function() { //滾動捲軸的時候觸發 新增圖片
        if (check_csroll()) {
            var dparent = document.getElementById("container");
            for (var i = 0; i < img_data.data.length; i++) {
                var dcontent = document.createElement("div"); //新增一個div
                dcontent.className = "box"; //在新增的div上加上class
                dparent.appendChild(dcontent); //在container內加入上面新增的div（.box）
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                dcontent.appendChild(boximg); //在box內加入新增的.box_img
                var img = document.createElement("img"); //新增一個img標籤
                img.src = "images/" + img_data.data[i].name; //從json字串加載圖片
                boximg.appendChild(img); //在.box_img中加入img標籤
            }
        }
        img_location("container", "box"); //調用函數讓新進來的圖片再一次讓圖片進行排序
    }
}

function check_csroll() { //滾動捲軸的判斷function （判斷通過就執行上面載入圖片）
    var dparent = document.getElementById("container"); //選取到container ID
    var dcontent = get_child_element(dparent, "box"); //執行get_child_element function並帶入兩個變數
    var last_content_height = dcontent[dcontent.length - 1].offsetTop; //找到最後加入的圖片算出該張圖到頂的距離
    var scroll_top = document.documentElement.scrollTop || document.body.scrollTop; //算出滾動到頂的距離
    var page_height = document.documentElement.clientHeight || document.body.clientHeight; //算出頁面高度（可見範圍）
    //console.log(scroll_top+":"+last_content_height+":"+page_height)
    if (last_content_height < scroll_top + page_height) { //判斷最後一張圖 小於 頁面滾動到頂的距離+頁面高度
        return true;
    }
}

function img_location(parent, content) { //帶入"container" 跟 "box"
    //////取出parent下的所有content全部子元素
    var dparent = document.getElementById(parent); //選取到container ID
    var dcontent = get_child_element(dparent, content); //執行get_child_element function並帶入兩個變數
    //找到container中有多少個.box
    var dec_width = get_width(dparent, dcontent); //執行get_width function並帶入兩個變數
    //算出一排可以擺幾張圖片 固定寬度
    var image_location = min_image_locatin(dec_width, dcontent) //執行min_image_locatin function並帶入兩個變數
    //把圖片放在上一排圖片高最低的下面


}

function get_child_element(parent, content) { //找到container中有多少個.box
    var content_array = []; //創造一個空陣列（塞.box用）
    var all_content = parent.getElementsByTagName("*"); //取得container下所有的子層元素（全部）
    for (var i = 0; i < all_content.length; i++) { //查看所有的子元素
        if (all_content[i].className == content) { //判斷子元素的class是不是等於.box (篩選出所有.box)
            content_array.push(all_content[i]) //把class等於.box的”parent.getElementsByTagName("i")”加入空陣列
        }
    }
    return content_array; //回傳篩選出來的子元素 （所有.box）
}

function get_width(dparent, dcontent) { //算出一排可以擺幾張圖片 固定寬度
    var img_width = dcontent[1].offsetWidth; //取得.box的寬度
    var win_width = document.documentElement.clientWidth; //取得螢幕頁面的寬度
    var num_width = Math.floor(win_width / img_width); //算出一排可以排幾張圖 用Math.floor()取整数
    dparent.style.cssText = "width:" + img_width * num_width + "px; margin:0 auto"; //固定寬度 （.box寬度*一排圖片的數量）
    return num_width; //回傳一排可以擺幾張圖的數量

}

function min_image_locatin(dec_width, dcontent) { //把圖片放在上一排圖片高最低的下面
    var box_height_array = []; //創造一個空陣列 （放第一排的圖的高度）
    for (var i = 0; i < dcontent.length; i++) { //查看所有圖片
        if (i < dec_width) { //判斷 i 小於 第一排圖片的數量
            box_height_array[i] = dcontent[i].offsetHeight; //取得第一排圖片的高度
            dcontent[i].style.position = "static";
        } else { //第二排後面都走else
            var min_height = Math.min.apply(null, box_height_array); //找出第一排圖片高度最小的那張圖片
            var min_index = get_min_height(box_height_array, min_height) //找到第一排高度最小的圖片位置
            dcontent[i].style.position = "absolute"; //賦予絕對定位的屬性
            dcontent[i].style.top = min_height + "px"; //加入圖片位移的上面距離 （第一排最小那張圖的高度）
            dcontent[i].style.left = dcontent[min_index].offsetLeft + "px"; //加入圖片位移的左邊距離 （第一排最小那張圖左邊的距離）
            box_height_array[min_index] = box_height_array[min_index] + dcontent[i].offsetHeight; 
            //疊加 讓目前第一排最小的圖的高度 = 自己的高度 + 現在要加入的圖片的高度
        }
    }

}

function get_min_height(box_height_array, min_height) { //找到第一排高度最小的圖片位置
    for (var i in box_height_array) { //查看第一排所有圖片的高度
        if (box_height_array[i] == min_height) { //判斷目前第一排第幾張圖 = 第一排最小的那張圖
            return i; //回傳那張圖所在的陣列位置
        }
    }
}
  
