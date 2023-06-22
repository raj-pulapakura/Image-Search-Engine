export interface FileState {
    file: File | null,
    fileURL: string | null,
    status: "awaiting upload" | "fetching similar images..." | "done",
    errorMsg: string | null,
    data: {
      classification: string,
      sim_images: {
        small: string,
        full: string,
      }[]
    } | null
}

export interface FileAction {
    type: "update file" | "update fileURL" | "update status" | "update errorMsg" | "update data",
    payload: any
  }