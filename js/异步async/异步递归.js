let questNumbers = [2, 3, 4, 5]

async function processQuestNumbers(questNumbers, index = 0) {
  if (index < questNumbers.length) {
    const promiseForNext = new Promise(resolve => {
      EventBus.$once('deleteQuestionDone', () => {
        resolve(); // 当事件触发时，解决 Promise
      });
    });
    EventBus.$emit('deleteQuestion', questNumbers[index]);
    await promiseForNext;

    // @tip: 递归删除的， 下次执行题号 -1
    questNumbers = questNumbers.map(num => num - 1);
    await this.processQuestNumbers(questNumbers, index + 1);
  }
}


、、、 、、、 、、、 、、、 、、、 、、、 、、、 、、、 、、、 


data(){
  return{
    deleteQuestionHandler: this.deleteQuestion.bind(this);
  }
}
mounted() {
  this.initResizeObserver();
  EventBus.$on('deleteQuestion', this.deleteQuestionHandler);
}
beforeDestroy() {
  EventBus.$off('deleteQuestion', this.deleteQuestionHandler);
}
async deleteQuestion(questNumber){
  if (this.index + 1 === questNumber){
    await this.handleDeleteQuest();  // 这是一个异步任务
    EventBus.$emit('deleteQuestionDone'); // 通知完成
  }
}