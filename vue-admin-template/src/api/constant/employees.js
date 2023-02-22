export default {
  hireType: [
    {
      id: 1,
      value: '正式'
    },
    {
      id: 2,
      value: '非正式'
    }
  ],
  mapKeyPath: {
    入职日期: 'timeOfEntry',
    转正日期: 'correctionTime',
    手机号: 'mobile',
    姓名: 'username',
    工号: 'workNumber'
  },
  exportExcelMapPath: {
    手机号: 'mobile',
    姓名: 'username',
    入职日期: 'timeOfEntry',
    聘用形式: 'formOfEmployment',
    转正日期: 'correctionTime',
    工号: 'workNumber',
    部门: 'departmentName'
  },
  stateOfCorrection: [
    {
      id: '1',
      value: '转正'
    },
    {
      id: '2',
      value: '未转正'
    }
  ],
  //   在职转态
  workingState: [
    {
      id: '1',
      value: '在职'
    },
    {
      id: '2',
      value: '离职'
    }
  ]
}
