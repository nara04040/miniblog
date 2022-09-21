<template>
  <div class="input-wrap shadow">
    <input type="text" v-model="newItem" class="input-box" maxlength="30" @keyup.enter="addItem"
      :class="{colorGray:important}">
    <!-- <button v-on:click="addItem">추가</button> -->

    <div class="option">
      <span @click="addIcon(0)" class="img1">
        이미지1
      </span>
      <span @click="addIcon(1)" class="img2">
        이미지2
      </span>
      <span @click="addIcon(2)" class="img3">
        이미지3
      </span>

      <span @click="addItem" class="add-bt">
        <i class="fas fa-plus add-bt-icon"></i>
      </span>
    </div>
    <!-- 안내창 -->
    <ModalVue v-bind:show="showModal" v-on:closemodal="showModal=false">
      <template #header>
        <h3>안내창</h3>
      </template>
      <template #body>
<h2>내용을 작성하여 주세요.</h2>
      </template>
    </ModalVue>
  </div>
</template>

<script>
  import {
    ref
  } from 'vue';
  import { useStore } from 'vuex';


  import ModalVue from '@/components/common/ModalVue.vue';

  export default {
    components: {
      ModalVue,

    },
    setup() {
      const store = useStore();
      const newItem = ref('');
      const newIcon = ref(0);
      const showModal = ref(false);

      const addItem = () => {
        let temp = newItem.value;
        let icon = newIcon.value;
        // 앞쪽 뒷쪽 공백 제거
        temp = temp.trim();
        //추후 업데이트 예정(정규표현식-문자열체크 문법)
        // 앞자리공백  공백   뒷자리공백
        if (temp !== '') {
          //localStorage.setItem(키, 값)
        

          // context.emit('additem', temp, icon);
          // store.commit('ADD_MEMO',{item:temp,index:icon});
          store.dispatch('fetchAddMemo',{item:temp,index:icon});

          resetItem();
        } else {
          showModal.value = true;
        }
      }

      // 내용 재설정
      const resetItem = () => {
        newItem.value = '';
      }
      const addIcon = (index) => {
        console.log(index);
        newIcon.value = index;
      }
      const important = ref(false);
      return {
        newItem,
        addItem,
        addIcon,
        important,
        showModal

      }
    }
  }
</script>

<style scoped>
  .input-wrap {
    position: relative;
    display: block;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: #fff;
    overflow: hidden;
    margin: 20px 0;
  }

  .input-wrap input {
    border-style: none;
  }

  .input-wrap input:focus {
    outline: none;
  }

  .input-box {
    width: calc(93% - 250px);
    font-size: 16px;
    margin-left: 20px;
  }

  .option {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
  }

  .img1 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/dog1.png') no-repeat center;
    background-size: cover;
  }

  .img2 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/dog2.png') no-repeat center;
    background-size: cover;
  }

  .img3 {
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 0;
    cursor: pointer;
    background: url('@/assets/images/dog3.png') no-repeat center;
    background-size: cover;
  }

  .add-bt {
    display: inline-block;

    background-color: hotpink;
    cursor: pointer;
  }

  .add-bt-icon {
    display: inline-block;
    vertical-align: middle;
    color: #fff;
    margin: 0 20px;
  }

  .colorGray {
    color: gray;
  }
</style>