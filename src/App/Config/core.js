let constants = new Object();

constants.BASE_URL = "http://127.0.0.1:8080";
constants.LOGIN_URL = "/login/auth";
constants.FORM_URL = "/leave/submitleave"
constants.LVREQ_URL = "/leave/getemployeeleaverequest"
constants.PENDINGLVREQ_URL = "/leave/getpendingleaverequest"
constants.PROCESSLVREQ_URL = "/leave/processpendingleaverequest"
constants.FORWARDINGOFFLIST_URL = "/leave/getforwardingofficers"
module.exports = constants;