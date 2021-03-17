module.exports = function () {
    return {
      incidents: [
        {id: 1, incidentNo:11,priority :'major', description:'Incident 1',narrative:['Incident 1','major'] ,customerInfo:'James Thomas', status:'In Progress',date:'15-03-2021',duration:20,comment:['Looking into it'],assigne:'Sally Thorn', resolution:'Done'},
        {id: 2, incidentNo:12,priority :'minor', description:'Incident 2',narrative:['Incident 2','minor'] ,customerInfo:'Olivia Thomas', status:'Dispatched',date:'18-03-2021',duration:30,comment:['Looking into it'],assigne:'Sherlock Homes', resolution:'Open'},
        {id: 3, incidentNo:13,priority :'major', description:'Incident 3',narrative:['Incident 3','major'] ,customerInfo:'Racheal Thomas', status:'Closed',date:'20-03-2021',duration:15,comment:['Looking into it'],assigne:'Jamey Mathew', resolution:'Done'},

      ]
    }

  }