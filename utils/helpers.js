import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'

export const NOTIFICATION_STORAGE_KEY = "@mobile-flashcards:notifications"

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch(err => console.log(err))
}

function createNotification () {
  return {
    title: 'Daily Reminder for Your Quiz',
    body: "👋 Don't forget to complete your quiz today...",
    sound: true,
    priority: 'high',
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export function setLocalNotification () {
  if (Constants.isDevice && Platform.OS !== 'web') {
    AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {

      if (data !== null) {
        return
      }

      Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {

          if (status !== 'granted') {
            return
          }

          Notifications.cancelAllScheduledNotificationsAsync()
          Notifications.scheduleNotificationAsync({
            content: createNotification(),
            trigger: {
              hour: 20,
              minute: 0,
              repeats: true,
            }
          })

          AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
        })
    })
  } else {
    alert('Must use physical device for Push Notifications')
  }
}
