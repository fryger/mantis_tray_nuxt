import axios from 'axios'

const { remote } = require('electron')
let config = []
remote.getGlobal('settings').get('config', function (error, data) {
  config = data
})

export const state = () => ({
    list: [],
    attachmentSize: ''
  })
  
  export const mutations = {
    addProject(state, payload) {
        
        
    
      state.list.push(...payload)
    
    },

    addConfig(state,payload){
        state.attachmentSize = payload
    }
  }

  export const actions = {
     async getProjects({commit}){
        await axios
      .get(config.api_url + '/projects/', {
        headers: {
          Authorization: config.api_key
        }
      })
      .then(response => (commit('addProject', response.data.projects)))
      },
      async getConfig({commit}){
      await axios
      .get(config.api_url + '/config?option[]=max_file_size', {
        headers: {
          Authorization: config.api_key
        }
      })
      .then(
        response =>(commit('addConfig', response.data.configs[0].value))
      )
    }
  }
