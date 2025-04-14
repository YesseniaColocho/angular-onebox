export function formatDate(date: string){
    return new Date(parseInt(date)).toLocaleDateString()
  }