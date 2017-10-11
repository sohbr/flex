class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    debugger;
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['The username or password you entered is incorrect.'], status: 422
    end
  end

  def destroy
    if current_user
      log_out!
    else
      render json: ['No user logged in'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end