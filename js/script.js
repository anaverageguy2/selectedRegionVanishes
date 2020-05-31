



$(function($) {
    
    //console.log("RUN");
    var canvas1 = $("#canvas2").get(0);
    var cntxt1 = canvas1.getContext("2d");
    var img1 = new Image();
    img1.src = "../images/girl.png";

    img1.onload = function(){
        canvas1.width = img1.width;
        canvas1.height = img1.height;
        cntxt1.drawImage(img1, 0 , 0);
        console.log("ATTACH")
        var stage = Jcrop.attach('target1');
        stage.listen('crop.change',(widget,e) => {
            let x, y, width_img, height;
            x = Math.floor(widget.pos.x);
            y = Math.floor(widget.pos.y);
            width_img = Math.floor(widget.pos.w);
            height = Math.floor(widget.pos.h);
            console.log(x, y, width, height);
            
            var width = canvas1.width;
            var imageData = cntxt1.getImageData(0, 0, 1920, 1080);
            
            for(var x_cord = x; x_cord < x + width_img; x_cord++){
                for(var y_cord = y; y_cord < y + height; y_cord++){
                    imageData.data[((width * y_cord) + x_cord) * 4] = 255;
                    imageData.data[((width * y_cord) + x_cord) * 4 + 1] = 255;
                    imageData.data[((width * y_cord) + x_cord) * 4 + 2] = 255;
                    imageData.data[((width * y_cord) + x_cord) * 4 + 3] = 0;
                }
            }
            cntxt1.putImageData(imageData, 0 ,0);
            stage.destroy();
            
          });
          
       
    }
    
});