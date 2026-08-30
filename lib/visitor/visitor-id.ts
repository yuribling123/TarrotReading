const VISITOR_ID_KEY = "moonlit-visitor-id"; //key for local storage

export function getVisitorId() {

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {

    visitorId = crypto.randomUUID();

    localStorage.setItem(

      VISITOR_ID_KEY,

      visitorId

    );

  }

  return visitorId;

}