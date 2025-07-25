'use strict';

var table;
var language;

function popTable(e) {
    table.city = e.currentTarget.city;
    table.getElementsByTagName('th')[0].textContent = table.city.name;
    table.style.display = 'table';
    table.style.left = e.clientX + 'px';
    table.style.top = e.clientY + 'px';
    e.stopPropagation();
}

function showName(e) {
    // reveal the city name when the mouse hovers over the city
    e.currentTarget.city.text.attr({opacity: 1});
}

function hideName(e) {
    // hide the city name when the mouse leaves the city
    e.currentTarget.city.text.attr({opacity: 0});
}

function handleSelect(e) {
    var select = +e.currentTarget.getAttribute('data-level');
    table.city.level = select;
    table.city.graph.attr({fill : color[select]});
    document.getElementById('level').textContent = calculate();
    table.style.display = 'none';
}

var color = ['#d3d3d3','#3598db', '#30cc70', '#f3c218', '#d58337', '#e84c3d'];

function calculate() {
    var sum = 0;
    for (var city in chinaMap) {
        sum += chinaMap[city].level;
    }
    return sum;
}

window.onload = function () {
    table = document.getElementById('table');
    var map = new Raphael('map',2000, 4000);
    var attr = {
            "fill": "#d3d3d3",
            "stroke": "#fff",
            "stroke-opacity": "1",
            "stroke-linejoin": "round",
            "stroke-miterlimit": "4",
            "stroke-width": "0.75",
            "stroke-dasharray": "none"
        };


    for (var key in chinaMap) {
        var city = chinaMap[key]
        var path = city.path;
        var graph = map.path(path).scale(1.8, 2, 0, 2);
        graph.attr(attr);
        city.graph = graph;
        city.level = 0;
        var x = graph.getBBox().x + graph.getBBox().width / 2 + city.offset.x;
        var y = graph.getBBox().y + graph.getBBox().height / 2 + city.offset.y;
        var text = map.text(x, y, city.name);
        text.attr({
            opacity: 0,
            'font-size': 10,
            'pointer-events': 'none'
        });
        city.text = text;

        [graph].forEach(
            function (e) {
                e.attr({cursor : 'pointer'});
                e.node.onclick = popTable;
                e.node.city = city;
                e.node.onmouseover = showName;
                e.node.onmouseout = hideName;
            }
        );
    }

    Array.from(document.getElementsByClassName('select')).forEach(
        function (select) {
            select.style.backgroundColor = color[select.getAttribute('data-level')];
            select.onclick = handleSelect;
        }
    );

    document.getElementsByTagName('html')[0].onclick = function () {
        table.style.display = 'none';
    };
};

