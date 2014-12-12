class ApplicationController < ActionController::Base
  protect_from_forgery
  #skip_before_filter :require_no_authentication
  #before_filter :authenticate_user!
  respond_to :html, :json
  
end
