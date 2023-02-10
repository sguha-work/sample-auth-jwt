class CommonService {
  instance = null;

  static get CommonServiceInstance() {
    if (this.instance == null) {
      this.instance = new CommonService();
    }
    return this.instance;
  }
  
  rejectResponse(error, code = 500) {
    return { error, code };
  }

  successResponse(payload, code = 200) {
    payload.supportedAppVersion = process.env.SUPPORTED_APP_VERSION.split(',');
    return { payload, code };
  }
}

export default CommonService;
