use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::prelude::*;

declare_id!("EbuV46viypME68rX1T966ckdFaonmU96fd1ewJ5XMy7");

#[program]
pub mod myepicproject {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;
    // Initialize total_gifs.
    base_account.total_gifs = 0;
    base_account.gif_list = Vec::new();
    Ok(())
  }

  // The function now accepts a gif_link param from the user. We also reference the user from the Context
  pub fn add_gif(ctx: Context<GifApi>, gif_link: String) -> ProgramResult {
    // Get a reference to the account and increment total_gifs
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;

    let user_address = &*user.to_account_info().key.to_string().clone();
    let url: String = gif_link.clone();
    let mut id = "0x".to_string();
    id.push_str(&user_address);
    id.push_str("_");
    id.push_str(&url);

    // Build the struct.
    let item = ItemStruct {
      votes: 0,
      id: id,
      gif_link: gif_link.to_string(),
      user_address: *user.to_account_info().key,
    };

    // Add it to the gif_list vector.
    base_account.gif_list.push(item);
    base_account.total_gifs += 1;
    Ok(())
  }

  pub fn upvote_gif(ctx: Context<GifApi>, gif_id: String) -> ProgramResult {
    // Get reference to the account and increment total_gifs
    let base_account = &mut ctx.accounts.base_account;

    let index = base_account.gif_list
                            .iter()
                            .position(|r| r.id == gif_id)
                            .unwrap();
    let mut gif = &mut base_account.gif_list[index];
    gif.votes += 1;

    Ok(())
  }

}

// Attach certain variables to the StartStuffOff context.

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

// Specify what data you want in the AddGif Context.
// Add the signer who calls the AddGif method to the struct so that we can save it

#[derive(Accounts)]
pub struct GifApi<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
  pub id: String,
  pub gif_link: String,
  pub user_address: Pubkey,
  pub votes: u64,
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
  pub total_gifs: u32,
  // Attach a Vector of type ItemStruct to the account.
  pub gif_list: Vec<ItemStruct>,
}