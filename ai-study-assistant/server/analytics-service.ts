import db from "./db";
export function analytics(userId:string){
  const sessions=db.prepare("SELECT minutes,started_at,activity,subject_id,topic_id FROM study_sessions WHERE user_id=? ORDER BY started_at DESC").all(userId) as any[];
  const attempts=db.prepare("SELECT score,total,percent,completed_at,quiz_id FROM quiz_attempts WHERE user_id=? ORDER BY completed_at DESC").all(userId) as any[];
  const cards=db.prepare("SELECT due_at,reviews,interval,ease,subject_id,topic_id FROM flashcards WHERE user_id=?").all(userId) as any[];
  const topics=db.prepare("SELECT t.id,t.name,t.completed,s.name subject_name FROM topics t JOIN subjects s ON s.id=t.subject_id WHERE s.user_id=? ORDER BY s.name,t.position").all(userId) as any[];
  const totalMinutes=sessions.reduce((n,x)=>n+Number(x.minutes||0),0);
  const quizAverage=attempts.length?Math.round(attempts.reduce((n,x)=>n+Number(x.percent||0),0)/attempts.length):0;
  const dueCards=cards.filter(x=>new Date(x.due_at).getTime()<=Date.now()).length;
  const completedTopics=topics.filter(x=>x.completed).length;
  const days=new Set(sessions.map(x=>new Date(x.started_at).toISOString().slice(0,10)));
  let streak=0,d=new Date(); while(days.has(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1)}
  const bySubject=Object.values(sessions.reduce((a,x)=>{const k=x.subject_id||"unassigned";a[k]??={subjectId:k,minutes:0};a[k].minutes+=Number(x.minutes||0);return a},{} as Record<string,{subjectId:string;minutes:number}>));
  const weeklyMinutes=sessions.filter(x=>Date.now()-new Date(x.started_at).getTime()<=7*86400000).reduce((n,x)=>n+Number(x.minutes||0),0);
  return {totalMinutes,quizAverage,dueCards,completedTopics,totalTopics:topics.length,streak,bySubject,weeklyMinutes};
}
