use anchor_lang::prelude::*;
use anchor_lang::solana_program::hash::hash;
declare_id!("X17mKJAEtGtQ1oNyLgFH4VL5PwzzbE7LimWha4RbAJD");

#[program]
pub mod anchor_vote_program_sol_a {
    use super::*;

        pub fn initialize (ctx: Context<Initialize>,_url:String) -> Result<()> {
            ctx.accounts.vote.bump = ctx.bumps.vote;
            ctx.accounts.vote.score = 0;
            Ok(())
        }

        pub fn upvote(ctx: Context<Vote>,_url:String) -> Result<()> {
            ctx.accounts.vote.score += 1;
            Ok(())
        }
         pub fn downvote(ctx: Context<Vote>,_url:String) -> Result<()> {
            ctx.accounts.vote.score -= 1;
            Ok(())
        }
}

#[derive(Accounts)<'info>]
#[instruction(_url:String)]
pub struct Initialize<'info> {
    #[accounts(mut)]
    signer: Signer<'info>,
    #[account(init,
        payer = signer,
        space = VoteState::INIT_SPACE,
        seeds = [hash(_url.as_bytes()).to_bytes()], 
        bump    
    )]
    vote: Account<'info, VoteState>,
    system_program: Program<'info, System>,
}


#[derive(Accounts)<'info>]
#[instruction(_url:String)]
pub struct Vote<'info> {
    #[accounts(mut)]
    signer: Signer<'info>,
    #[account(mut,
        seeds = [hash(_url.as_bytes()).to_bytes()], 
        bump  = vote.bump 
    )]
    vote: Account<'info, VoteState>,
    system_program: Program<'info, System>,
}
#[account]

pub struct VoteState{
    score: i64,
    bump: u8,
}

impl Space for VoteState {
    const INIT_SPACE: usize = 8 + 8 + 1;
}