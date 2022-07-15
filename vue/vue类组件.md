## 基于TS, vue-class-component 类组件的基本结构
```typescript
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { LocaleMessageObject } from "vue-i18n"
import { CommonObject } from "@/models/common"
import { State, Mutation } from "vuex-class"
 
// @Component 装饰器可以使类成为 Vue 组件
// ArticleDetails class will be a Vue component
@Component({
  name: "ArticleDetails",
  filters: {}
})
export default class ArticleDetails extends Vue {
  // Prop
  // 注意:属性的ts类型后面需要加上undefined类型；或者在属性名后面加上!，表示非null 和 非undefined
  // 的断言，否则编译器会给出错误提示；
  //@Prop 是告诉 Vue xxx 不是 data 是 prop
  //Number 是告诉 Vue xxx 运行时是个 Number 类型
  //number | undefined 是告诉 TS xxx 的编译时类型
  @Prop(Number) xxx: number | undefined;
  @Prop({ default: {}, required: true })
  listing!: CommonObject
 
  // Data
  texts = this.$t("dashboard-page") as LocaleMessageObject
 
  // Computed
  get saveBtnAble() {
    console.log("Computed")
  }
  // vuex state
  @State("currentBrandId", { namespace: "Brand" })
  currentBrandId!: number | string
  @State("activedMenu", { namespace: "Menu" })
  activedMenu!: Menu | { name: "" }
 
  // Watch
  @Watch("currentBrandId")
  curBrandIdChange(newV: number | string) {
    // 业务代码
  }
 
  // Mutation
  @Mutation("updateActivedMenu", { namespace: "Menu" })
  updateActivedMenu!: Function
 
  // life hooks
  async beforeMount() {
    console.log("beforeMount")
  }
 
  // Methods
  _onClickDashboard() {
    this.$emit("_onClickDashboard")
    this.updateActivedMenu()
  }
  _onClickClose() {
    this.$emit("_onClickDashboard")
  }
}
</script>
```
