var http = require('http');
var server = http.createServer(requestHandler); 
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
}

function requestHandler(req, res) 
{
    try
    {
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    
    if (query['cmd'] == undefined)
      throw Error("A command must be specified");
    
    var result = {};
    if (query['cmd']=='calcDistance')
        {
            result = calcDistance(query);
        }
        else if (query['cmd']=='calcCost')
        {
            result=calcWalk(query);
        }
        else
        {
            throw Error ("invalid command: "+query['cmd']);
        }
        res.write(JSON.stringify(result));
        res.end('');
        }
        
            catch (e)
        {
            var error = {'error':e.message};
            res.write(JSON.stringify(error));
            res.end('');
        }
        
    Function calcDistance(query)
    {
        if(query['mpg']==undefined)||isNaN(query['mpg'])||query['mpg']<0)
            throw Error("please specify a valid input for vehicle's mpg.");
        if(query['budget']==undefined)|| isNaN(query['budget'])||query['budget']<0)
            throw Error("please specify a valid input for preferred budget ");
        if(query['cost']==undefined)||isNaN(query['cost'])||query['cost']<0)
            throw Error("please specify a valid input for cost of gas per gallon.");
            
        var mpg = parseInt(query['mpg']);
        var budget = parseInt(query['budget']);
        var cost = parseInt(query['cost']);
        
        var result = {(budget/cost)*mpg}
        return result;
    }
    
    Function calcCost(query)
    {
        if(query['mpg']==undefined)||isNaN(query['mpg'])||query['mpg']<0)
            throw Error("please specify a valid input for vehicle's mpg.");
        if(query['budget']==undefined)|| isNaN(query['budget'])||query['budget']<0)
            throw Error("please specify a valid input for preferred budget ");
        if(query['cost']==undefined)||isNaN(query['cost'])||query['cost']<0)
            throw Error("please specify a valid input for cost of gas per gallon.");
            
        var mpg = parseInt(query['mpg']);
        var budget = parseInt(query['budget']);
        var cost = parseInt(query['cost']);
        
        var result = {(distance/mpg)*cost}
        return result;
        
    }
            
    }
    