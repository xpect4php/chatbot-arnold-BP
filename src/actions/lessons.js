import React from 'react'
import { Text, Button, RequestContext } from '@botonic/react'
import LessonsForm from '../webchat/lessonsFormMessage'
import LessonsList from '../webchat/lessonsListMessage'
import config from '../assets/chatbotConfig.json'

class LessonsService extends React.Component {
  static contextType = RequestContext

  static async botonicInit({ input, session, params, lastRoutePath }) {
    if (!session.lessons) {
      const response = await fetch(config.apiConfig.lessonsUrl)
      session.lessons = await response.json()   
    }
  }
  render() {
    return (
      <>
        <Text>Nabízíme tyto lekce:</Text>
        <LessonsList data={this.context.session.lessons}/>
        <Text>
          Můžete zvolit možnost nebo se vrátit do hlavního menu.
          <Button payload='joinLesson'>Přihlásit se na lekci</Button>
          <Button payload='priceList' payload='priceList-lessons'>Ukázat ceník</Button>
          <Button payload='help-yes'>Vrátit se do hlavního menu</Button>
        </Text>
      </>
    )
  }
}

class JoinLesson extends React.Component {
  static contextType = RequestContext

  static async botonicInit({ input, session, params, lastRoutePath }) {
    if (!session.lessons) {
      const response = await fetch(config.apiConfig.lessonsUrl)
      session.lessons = await response.json()   
    }
  }
  render() {
    return (
      <>
        <Text>Pro přihlášení zvolte jednu z lekcí</Text>
        <LessonsForm data={this.context.session.lessons}/>
      </>
    )
  }
}

export {
  LessonsService,
  JoinLesson
}