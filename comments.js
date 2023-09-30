// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server

var server = http.createServer(function(request,response){
    // 2.1 get url
    var parsedUrl = url.parse(request.url);
    // 2.2 get path
    var resource = parsedUrl.pathname;
    console.log('resource='+resource);
    // 2.3 get query string as an object
    var query = qs.parse(parsedUrl.query);
    console.log('query='+JSON.stringify(query));
    // 2.4 get http method
    var method = request.method;
    console.log('method='+method);
    // 2.5 set response header
    response.writeHead(200,{'Content-Type':'text/html'});
    // 2.6 send response
    if(resource == '/'){
        fs.readFile('./resource/index.html', 'utf-8', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end('404 not found');
            }else{
                response.end(data);
            }
        });
    }else if(resource == '/create'){
        fs.readFile('./resource/create.html', 'utf-8', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end('404 not found');
            }else{
                response.end(data);
            }
        });
    }else if(resource == '/create_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`./data/${title}`, description, 'utf-8', function(error){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    }else if(resource == '/update'){
        fs.readFile(`./resource/update.html`, 'utf-8', function(error, data){
            if(error){
                response.statusCode = 404;
                response.end('404 not found');
            }else{
                fs.readdir('./data', function(error, filelist){
                    var title = query.id;
                    fs.readFile(`./data/${title}`, 'utf-8', function(error, description){
                        var list = template.list(filelist);
                        var html = template.HTML(title, list, `<form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>    
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>`, '');
                        response.end(html);
                    }
                    );
                }
                );
            }
        }
        );
    }
    else if(resource == '/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`./data/${id}`, `./data/${title}`, function(error){
                fs.writeFile(`./data/${title}`, description, 'utf-8', function(error){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                });
            });
        });
    }
    else if(resource == '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`./data/${id}`, function(error){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    }
    else{
        response.statusCode = 404;
        response.end('404 not found');
    }
}
);
// 3. start web server
server.listen(3000, function(){
    console.log('Server running at http://localhost:3000');
});

