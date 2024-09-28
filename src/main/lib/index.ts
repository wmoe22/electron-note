import { appDirectoryName, fileEncoding } from '@shared/constants'
import { CreateNote, DeleteNote, GetNotes, NoteInfo, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'
const welcomeNoteFileName = 'welcome.md'

export const getRootDir = () => {
  return path.join(homedir(), appDirectoryName)
}
export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFileNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  // filter file

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  const welcomeNoteExists = notes.includes(welcomeNoteFileName)

  if (isEmpty() && !welcomeNoteExists) {
    console.info('No notes found,creating a welcome note')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    //create the welcome note
    await writeFile(`${rootDir}/${welcomeNoteFileName}`, content, { encoding: fileEncoding })

    notes.push(welcomeNoteFileName)
  }

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.log(`Writing note ${filename}`)

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')

    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)
  console.log(parentDir, 'parentDir')
  console.log(rootDir, 'rootdir')

  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation Failed!',
      message: `All notes must be saved under ${rootDir} Avoid using other directories.`
    })

    return false
  }

  console.log(`Creating note: ${filePath}`)

  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete ${filename}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
