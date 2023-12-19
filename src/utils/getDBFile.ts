import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export const getLocalDB = async () => {
  await Sharing.shareAsync(
    FileSystem.documentDirectory + 'SQLite/db.sqlite',
    { dialogTitle: 'share or copy your DB via' }
  )
}