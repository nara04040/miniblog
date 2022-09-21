import axios from 'axios'
// 데이터를 불러오는 내용
// const storage = {
//   getData(){
//     const arr = []
//     const total = localStorage.length;
//     if(total > 0){
//       for(let i = 0; i < total; i++){
//         // 추후 DB 연동 예정
//         let obj = localStorage.getItem(localStorage.key(i));
//         arr.push(JSON.parse(obj))
//         // 키 값을 이용해서 정렬하기(오름차순)
        
//       }
//        // 키값을 이용해서 정렬하기(오름차순)
//         arr.sort((a, b) => {
//           if(a.id > b.id) return -1;
//           if(a.id === b.id) return 0;
//           if(a.id < b.id) return 1;
//         });
//     }
//     return arr
//   }
// }
const timeUtil = {
  addZero(n) {
    return n < 10 ? '0' + n : n;
  },
    // 현재 시간을 리턴
  // 현재 시간값을 계산해서 중복이 되지 않는 값을 처리한다.
  // key 와 id를 생성해 주기 위해서 처리
  // 10보다 작은 값에 0을 붙임
  getCurrentDate(){
    let date = new Date();
    return date.getFullYear().toString() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) +
      this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());              
  },
  getCurrentTime(){
    let date = new Date();
    return date.getFullYear().toString()+ '년' + this.addZero(date.getMonth() + 1) + '월' + this.addZero(date.getDate()) +'일' + this.addZero(date.getHours()) + '시' + this.addZero(date.getMinutes()) + '분';              
  }
}
const state = {
  headerText: 'My Diary Memo',
  // memoItemArr : storage.getData(),
  memoItemArr : [],
  iconArr : ['dog1.png','dog2.png','dog3.png']
};
const actions = {
      fetchReadMemo(context){
        axios.get('http://nara04040.dothome.co.kr/page-miniblog/read.php')
        .then(response => {
          context.commit("READ_MEMO", response.data.result)
        })
        .catch(err => console.log(err))
      },
      // 외부 데이터 연동
      fetchAddMemo(context, obj){
        // 서버의 주소로 접근해 자료를 push한다
        // push 하고나서 정상적으로 추가되었다면
        // 아래의 명령을 실행한다.
        let addData = {
          user : timeUtil.getCurrentDate(),
          title : obj.item,
          date : timeUtil.getCurrentTime(),
          icon : state.iconArr[obj.index] 
        }
        axios.get(`http://nara04040.dothome.co.kr/page-miniblog/write.php?user=${addData.user}&title=${addData.title}&date=${addData.date}&icon=${addData.icon}`)
        .then(res => {
          if(res.data.result == 1){
            // console.log('목록가져오기')
            context.commit("ADD_MEMO", addData)
          }else{
            console.log('서버에러')
          }
        })
        .catch(err=>console.log(err))
      },
      fetchDeleteMemo({commit}, obj){
        // 서버의 주소로 접근해 데이터를 지운다.
        // 정상적으로 처리되었다면 아래를 실행한다.
        // context.commit("DELETE_MEMO", obj);
        axios.get(`http://nara04040.dothome.co.kr/page-miniblog/delete.php?id=${obj.id}`)
        .then(res => {
          console.log('서버측 회신', res.data);
          console.log('삭제',obj)
          commit("DELETE_MEMO", obj);
        })
        .catch(err => console.log(err))
      },
      fetchUpdateMemo({commit}, obj){
        // 서버의 주소로 접근해 fetch한다.
        // 정상적으로 처리되었따면
        // 아래를 실행한다.
        let complete = 1;
        if(obj.item.complete == true) {
          complete = 0;
        }else{
          complete = 1;
        }
       
        axios.get(`http://nara04040.dothome.co.kr/page-miniblog/update.php?id=${obj.item.id}&complete${complete}`)
        
        .then(response=>{
          console.log('업데이트',response.data);
          // commit('');
          commit("UPDATE_MEMO", obj);
        }).catch(err=>console.log(err))
      },
      fetchClearMemo({commit}){
        // 서버의 주소로 접근해 delete한다.
        // 정상적으로 실행되었다면
        // 아래를 실행한다.
        axios.get("http://nara04040.dothome.co.kr/page-miniblog/delete.php?id=all")
        .then(response => {
          console.log('전체삭제 ', response.data);
          commit("CLEAR_MEMO");
        })
        .catch(err=>console.log(err))
      }
};
const mutations = {
    READ_MEMO(state, payload){
    // 속성중 complete 를 true와 false 로 교체
    payload.forEach((item)=>{
    if(item.complete ==="0"){
      item.complete = false;
    }else{
      item.complete = true;
    }
    });


      state.memoItemArr = payload;
    },
    // 데이터 (state)를 업데이트 하는 기능 모음
    // 속성을 대문자로 만들어줌

    // 아이템 추가
    ADD_MEMO(state,payload){
      // let memoTemp = {

      //   id: timeUtil.getCurrentDate(),
      //   complete: false,
      //   memotitle : payload.item,
      //   memodate : timeUtil.getCurrentTime(),
      //   memoicon : state.iconArr[payload.index]
      // };
  
      //추후 실제 DB 연동 예정
      // localStorage.setItem(memoTemp.id, JSON.stringify(memoTemp));
      // state.memoItemArr.push(memoTemp);  
      
      // axios를 이용해서 추가된 데이터의 정보를 가져와서 목록 한개를 추가한다.
      axios.get(`http://nara04040.dothome.co.kr/page-miniblog/get.php?user=${payload.user}`)

     
      
      .then(res => {
        const obj = res.data.result[0];
        obj.complete = false;
        state.memoItemArr.push(obj);
      })
      .catch(err => console.log(err))
        state.memoItemArr.sort((a, b) => {
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;
        if(a.id < b.id) return 1;
      });
    },
    // 아이템 삭제
    DELETE_MEMO(state, payload){
    // localStorage 에서 key를 통해서 지운다.
    localStorage.removeItem(payload.item)
    // 배열(memoItempArr) 에서도 지운다.
    state.memoItemArr.splice(payload.index, 1)

     // 키값을 이용해서 정렬하기(오름차순)
        state.memoItemArr.sort((a, b) => {
        if(a.id > b.id) return -1;
        if(a.id === b.id) return 0;
        if(a.id < b.id) return 1;
      });
    },
    // 아이템 변경 {item, index}
    UPDATE_MEMO(state, payload){
          // localstorage 에서는 update 메소드를 지원하지 않는다.
    // 찾아서 지우고, 
    // localStorage.removeItem(payload.item.id);
    // 변경한다.
    // item.complete = !item.complete;
    state.memoItemArr[payload.index].complete = !state.memoItemArr[payload.index].complete
    //다시 set 한다.
    // localStorage.setItem(payload.item.id , JSON.stringify(payload.item));
    //     state.memoItemArr.sort((a, b) => {
    //     if(a.id > b.id) return -1;
    //     if(a.id === b.id) return 0;
    //     if(a.id < b.id) return 1;
    //   });
    // },
    },
    // 전체 아이템 삭제
    CLEAR_MEMO(state){
      // localstorage에서 전체내용 삭제
      // 추후 DB 연동 예정
      localStorage.clear();
      state.memoItemArr.splice(0);
    }
};
const getters = {
      // state 의 값을 호출한다
    // computed 에서 감시해 반영한다.
    getMemoArr(state){
      // 조건에 따라 다른 결과물을 돌려준다.
      return state.memoItemArr;
    }
};

export default {state, actions, mutations, getters};