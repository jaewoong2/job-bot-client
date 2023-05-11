export type Temperature = { temperature: number }

export type ChatGPTResponse = {
  role: string
  content: string
}

export type Star = {
  situation: string
  task: string
  action: string
  result: string
  temperature: number
}

export type Feedback = {
  keyword: string
  feedback: string
  temperature: number
}

export type Pnf = {
  content: string
  job: string
  temperature: number
}

export type Copilot = {
  title: string
  position: string
  content: string
  temperature: number
}
