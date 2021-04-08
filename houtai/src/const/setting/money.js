export default {
  column: [ {
    label: '设置服务费',
    prop: 'money',
    option: {
      size: 'small',
      submitText: '提交123',
      column: [{
        label: '金额区间',
        span: 16,
        row: true,
        labelWidth: '200',
        type: 'text',
        prop: 'section1'
      },
      {
        label: '服务费率',
        span: 16,
        row: true,
        labelWidth: '200',
        type: 'text',
        prop: 'rate1'
      }, {
        label: '金额区间',
        span: 16,
        row: true,
        labelWidth: '200',
        type: 'text',
        prop: 'section2'
      },{
        label: '服务费率',
        span: 16,
        row: true,
        labelWidth: '200',
        type: 'text',
        prop: 'rate2'
      },]
    }
  }]
}