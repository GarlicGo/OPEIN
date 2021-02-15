function getSchoolInfo() {
    return [{
        name: "东南大学",
        label: "34/985/211",
        region: "江苏南京",
        // 考研科目
        exams: [{
            examName: "学硕初试",
            publicExamContent: `政治/数学一/英语一`,
            professionalExamContent: `数据结构60，计组50，软件工程40`,
        }, {
            examName: "专硕初试",
            publicExamContent: `政治/数学二/英语二`,
            professionalExamContent: `数据结构`,
        }, ],
        // 第四轮学科评估
        majorEvaluationData: [{
                majorName: "计算机科学与技术",
                level: "A-"
            },
            {
                majorName: "软件工程",
                level: "B+"
            }
        ],
        // 考研初试成绩
        preTestData: [{
                major: "大数据与人工智能",
                degreeType: "学硕",
                year: 2019,
                scores: [344, 365, 354, 336],
            },
            {
                major: "大数据与人工智能",
                degreeType: "专硕",
                year: 2019,
                scores: [344, 365, 354, 336],
            }
        ],
        // 相关通知
        noticesData: [{
            name: "研究生招生网（硕士招生）",
            url: "https://yzb.seu.edu.cn/6676/list.htm",
        }, {
            name: "东南大学2021年硕士研究生入学考试部分学院初试科目说明",
            url: "https://yzb.seu.edu.cn/2020/0923/c6676a347452/page.htm",
        }, ]

    }];
}

function dealSchoolInfo(schools) {
    $.each(schools, function(SchoolIndex, SchoolVal) {
        schools[SchoolIndex].name = `<strong>${schools[SchoolIndex].name}</strong><br>${schools[SchoolIndex].region} ${schools[SchoolIndex].label}`;
        // 生成学科评估列表
        schools[SchoolIndex].majorEvaluationRes = "";
        $.each(SchoolVal.majorEvaluationData, function(index, value) {
            schools[SchoolIndex].majorEvaluationRes += `${value.majorName}：${value.level}<br>`
        });

        // 生成各专业分数统计结果
        schools[SchoolIndex].preTestRes = "";
        $.each(SchoolVal.preTestData, function(index, value) {
            schools[SchoolIndex].preTestRes += `【${value.year}${value.degreeType}】${value.major}：${MinNum(value.scores)}，${AverageNum(value.scores)}，${MaxNum(value.scores) }<br>`
        });

        // 生成考试内容列表
        schools[SchoolIndex].examsRes = "";
        $.each(SchoolVal.exams, function(index, value) {
            schools[SchoolIndex].examsRes += `【${value.examName}】 ${value.publicExamContent}<br>${value.professionalExamContent}<br>`
        });

        // 生成通知列表
        schools[SchoolIndex].noticesRes = "";
        $.each(SchoolVal.noticesData, function(index, value) {
            schools[SchoolIndex].noticesRes += `<a target="_blank" href="${value.url}">${value.name}</a><br>`
        });
    });

    console.log(schools);
    return schools;
}

$(function() {

    $('.table').DataTable({
        data: dealSchoolInfo(getSchoolInfo()),
        columns: [{
            data: 'name'
        }, {
            data: 'majorEvaluationRes'
        }, {
            data: 'preTestRes'
        }, {
            data: 'examsRes'
        }, {
            data: 'noticesRes'
        }],
        language: {
            "decimal": "", //小数的小数位符号  比如“，”作为数字的小数位符号
            "emptyTable": "没有数据哟~~", //没有数据时要显示的字符串
            "info": "当前页显示第 _START_ 条到第 _END_ 条，共 _TOTAL_ 条", //左下角的信息，变量可以自定义，到官网详细查看
            "infoEmpty": "无记录", //当没有数据时，左下角的信息
            "infoFiltered": "(从 _MAX_ 条记录过滤)", //当表格过滤的时候，将此字符串附加到主要信息
            "infoPostFix": "", //在摘要信息后继续追加的字符串
            "thousands": ",", //千分位分隔符
            "lengthMenu": "每页 _MENU_ 条记录", //用来描述分页长度选项的字符串
            "loadingRecords": "加载中...", //用来描述数据在加载中等待的提示字符串 - 当异步读取数据的时候显示
            "processing": "处理中...", //用来描述加载进度的字符串
            "search": "搜索", //用来描述搜索输入框的字符串
            "zeroRecords": "没有找到", //当没有搜索到结果时，显示
            "paginate": {
                "first": "首页",
                "previous": "上一页",
                "next": "下一页",
                "last": "尾页"
            }
        }
    });


});


function MaxNum(arr) {
    return Math.max.apply(null, arr);
}

function MinNum(arr) {
    return Math.min.apply(null, arr);
}

function AverageNum(arr) {
    var sum = eval(arr.join("+"));
    var svg = (sum / arr.length * 100) / 100;
    return svg;
}

function SumNum(arr) {
    var sum = eval(arr.join("+"));
    return sum;
}