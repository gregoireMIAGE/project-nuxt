import Axios from 'axios';
import Moment from 'moment';
Moment.locale('fr');

export const state = () => ({
  verificationApi: {
    traefik: {
      content: 'Verification Traefik',
      timestamp: Moment().format("DD-MM-YYYY HH:mm"),
      size: 'large',
      type: 'success',
      icon: 'el-icon-check'
    },
    backend: {
      content: 'Verification API',
      timestamp: '2018-04-12 20:46',
      size: 'large',
      type: 'danger',
      icon: 'el-icon-close'
    },
    mysql: {
      content: 'Verification MYSQL',
      timestamp: '2018-04-03 20:46',
      size: 'large',
      type: 'danger',
      icon: 'el-icon-close'
    }
  }
});

export const mutations = {
  setMysql(state, value){
    state.verificationApi.mysql.type = value.check;
    state.verificationApi.mysql.timestamp = value.time;
  },
  setBackEnd(state, value){
    state.verificationApi.backend.type = value.check;
    state.verificationApi.backend.timestamp = value.time;
  }
};

export const actions = {
  verification (context) {
    return Axios.get("/api").then((res) => {
      if(!res.data){
        throw "there no data"
      }
      context.commit("setBackEnd", {
        check:"danger",
        time: Moment().format("DD-MM-YYYY HH:mm")
      });
      context.commit("setMysql", {
        check:"danger",
        time: Moment().format("DD-MM-YYYY HH:mm")
      });
      if(res.data.backend.check) {
        context.commit("setBackEnd", {
          check:"success",
          time: Moment(res.data.backend.time).format("DD-MM-YYYY HH:mm")
        });
      }
      if(res.data.mysql.check) {
        context.commit("setMysql", {
          check:"success",
          time: Moment(res.data.mysql.time).format("DD-MM-YYYY HH:mm")
        });
      }

    }).catch((err) => {
      context.commit("setMysql", "danger");
      context.commit("setBackEnd", "danger");
      console.log(err);
      return err;
    })

  }
};
