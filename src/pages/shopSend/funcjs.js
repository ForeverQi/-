export default {
  data() {

  },
  methods: {
    change(index,key){
      this.list[index][key] = !this.list[index][key]
    },
  }
}
