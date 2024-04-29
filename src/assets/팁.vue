
1.
v-text-filed에 
@blur="checkDuplicate(initialData.url)"
이것을 넣으면 텍스트를 칠때마다 함수 실행.

2. 원하는 영역에 스크롤 이벤트 걸기.
mounted() {
    const wrapElement = document.querySelector('.app-content__wrap');
    wrapElement.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // 초기 로딩시 한 번 호출
  },

  beforeDestroy() {
    const wrapElement = document.querySelector('.app-content__wrap');
    wrapElement.removeEventListener('scroll', this.handleScroll);
  }

  3. 라인 할떄 사용
  <div v-if="comment.fnComment === 'true'" class="v-hr --display_block-none-block opacity_50" />


  4. edit item 예시.
  <div class="edit-item" v-bind="props">
    <div class="edit-item__wrap">
      <icon icon="image"><image /></icon>
      <span>응답하기</span>
    </div>
    <div class="edit-item__content">응답하기</div>          
  </div>


  5. saveValue 할때
  saveValue() {
    // Update the initialData.title with the current value of this.title
    this.$emit('update:transports', this.transportItem);

    // Close the dialog
    this.dialog = false;
  }

  6. vuex를 통한 업로드 방법.

  import { mapActions } from 'vuex';

  methods: {
    ...mapActions(['updateFormDataAction']),
    saveValue() {
      // orders는 실제로는 state.postData.formData.orders 이다.
      const updateData = {
        orders: this.defaultOrders,
      };
      this.updateFormDataAction(updateData);

      // Close the dialog
      this.dialog = false;
    }
}


7. {{ type }} 설정 부분에 등록방법
computed: {
  type() {
    if (this.isConfirmed.commentPassword === false) {
      return '필수 사항';
    } else {
      return this.showPassword ? this.comment.password : '⦁⦁⦁⦁' // '*'로 가리기
    }
  },
},

8. 자식요소에서 부모요소 업데이트 할경우
<!-- 자식요소 -->
this.$emit('update:selected', option.value);

<!-- 부모요소 -->
<fnSelect
      options="effectStyle"
      :selected="formData.initialData.effect.config"
      @update:selected="formData.initialData.effect.config = $event"
  />


9. 토글 기능
toggleFunction() {
  this.calendar.fnCountdown = !this.calendar.fnCountdown;
},

10. 버튼 바뀐것
<v-card-actions class="gap_8">
  <v-spacer></v-spacer>
  <button class="button-select height_36 pa_24" variant="text" @click="dialog = false"><span>취소</span></button>
  <button class="button-select selected height_36 pa_24" variant="text" @click="saveValue"><span>확인</span></button>
</v-card-actions>

11. 깃허브 주소
mask-image: url('https://jwpggit.github.io/storage/image/card/checkbox.svg');

12. save 버튼
import { mapGetters, mapActions } from 'vuex';

...mapActions({saveFormData:'saveFormData'}),
submitPost() {
  console.log ('스타트')
  this.saveFormData()
    .then(() => {
      console.log ('성공')
    })
    .catch(error => {
      console.log ('실패')
      console.error('Error saving form data:', error);
    });
},

submitPost() {
  console.log ('스타트')
  this.saveFormData()
    .then(() => {
      console.log ('성공')
      //this.resetFormDataAction()
      this.$router.push({ name: 'archive' });
    })
    .catch(error => {
      console.log ('실패')
      console.error('Error saving form data:', error);
    });
},

13. 애니메이션
-webkit-transition: all .25s ease;
transition: all .25s ease;

14. scss에 지정해두고 사용방법

@mixin background-gradient {
  background-image: linear-gradient(90deg, var(--primary-color) 0px, var(--primary-on) 40px, var(--primary-color) 80px);
  background-size: 600px;
}

.gallery_grid__content {
  @include background-gradient;
}