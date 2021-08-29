const template = require('./00_template');

exports.loginPage = function () {
    return `
        ${template.header()}
        <div class="container">
        <div id="demo" class="carousel slide" data-ride="carousel">

            <!-- Indicators -->
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <!-- The slideshow -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="img/bg1.jpg" alt="comets" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Your name </h3>
                        <p>2016 Japanese animated romantic fantasy film</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="img/bg2.jpg" alt="totoro" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Totoro</h3>
                        <p>1988 Japanese animated fairy tale film</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="img/bg3.jpg" alt="lala land" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Lala Land</h3>
                        <p>2016 American musical romantic comedy film</p>
                    </div>
                </div>
            </div>

            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <!-- 대문사진 끝 -->
    </div>

    
    <div class="container">
    <div class="row pb-2 pt-2">
        <div class="col-8 invisible"></div>
        <div class="col-4">
        <button class="btn btn-warning btn-sm" onclick="location.href='/user/register'">
            <span class="text-light">
                Sign Up
            </span>
        </button>
        </div>
    </div>  
    <div class="row">
        <div class="col-8 invisible"></div>
        <div class="col-4">
            <form action="/login" method="POST">

                <table class="table table-borderless">
                    <tr>
                        <div class="form-group">
                            <label for="email">ID:</label>
                            <input type="text" class="form-control" id="uid" name="uid" placeholder="Enter ID">
                        </div>
                    </tr>
                    <tr>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" id="pwd" name="pwd"
                                placeholder="Enter password">
                        </div>
                    </tr>
                    <tr>
                        <td>
                        <div class="form-group form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox">
                                Remember me
                            </label>
                        </div>
                        </td>
                        <td>
                        <button type="submit" class="btn btn-primary btn-sm">
                            Submit
                        </button>
                        </td>

                    </tr>
                    <tr>
                    </tr>
                </table>
            </form>
        </div>
        </div>
    </div>
        ${template.footer()}
    `
}